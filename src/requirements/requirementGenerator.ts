import { writeFileSync } from 'fs';
import {
  CollegeOrMajorRequirement,
  DecoratedRequirementsJson,
  RequirementChecker,
  Course,
  MutableMajorRequirements,
  InitialRequirementDecorator,
  RequirementDecorator,
} from './types';
import sourceRequirements, { colleges } from './data';
import { NO_FULFILLMENTS_COURSE_ID, SPECIAL_COURSES } from './data/constants';
import { examRequirementsMapping, examToCourseMapping, courseToExamMapping } from './examMapping';
import { fullCoursesArray } from '../constants/courses/typed-full-courses';

const applyDecoratorsToRequirements = (
  requirements: readonly CollegeOrMajorRequirement[],
  initialDecorator: InitialRequirementDecorator,
  ...decorators: RequirementDecorator[]
): readonly DecoratedCollegeOrMajorRequirement[] =>
  requirements.map((requirement) => {
    const decoratedRequirement = initialDecorator(requirement);
    return decorators.reduce((res, decorator) => decorator(res), decoratedRequirement);
  });

const specialCourses: Course[] = Object.entries(SPECIAL_COURSES)
  .map(([name, crseId]) => ({
    subject: name,
    crseId,
    catalogNbr: '',
    titleLong: '',
    enrollGroups: [],
    acadCareer: '',
    catalogLevel: '',
    instructionInfo: '',
    instructionMode: '',
    acadGroup: '',
  }))
  .filter(({ crseId }) => crseId !== NO_FULFILLMENTS_COURSE_ID);

const getEligibleCoursesFromRequirementCheckers = (
  checkers: readonly RequirementChecker[]
): readonly (readonly number[])[] =>
  checkers.map((oneRequirementChecker) => {
    const courseIdSet = new Set(
      [...fullCoursesArray, ...specialCourses]
        .filter((course) => oneRequirementChecker(course))
        .map((course) => course.crseId)
    );
    return Array.from(courseIdSet);
  });

const decorateRequirementWithCourses: InitialRequirementDecorator = (requirement) => {
  switch (requirement.fulfilledBy) {
    case 'self-check':
      return requirement;
    case 'courses':
    case 'credits': {
      const { checker, additionalRequirements, ...rest } = requirement;
      return {
        ...rest,
        courses: getEligibleCoursesFromRequirementCheckers(checker),
        additionalRequirements:
          additionalRequirements &&
          Object.fromEntries(
            Object.entries(additionalRequirements).map(
              ([name, { checker: additionalChecker, ...additionalRequirementRest }]) => [
                name,
                {
                  ...additionalRequirementRest,
                  courses: getEligibleCoursesFromRequirementCheckers(additionalChecker),
                },
              ]
            )
          ),
      };
    }
    case 'toggleable': {
      const { fulfillmentOptions } = requirement;
      return {
        ...requirement,
        fulfillmentOptions: Object.fromEntries(
          Object.entries(fulfillmentOptions).map(([optionName, option]) => {
            const { checker, ...rest } = option;
            const courses = getEligibleCoursesFromRequirementCheckers(checker);
            return [optionName, { ...rest, courses }];
          })
        ),
      };
    }
    default:
      throw new Error();
  }
};

const equivalentCourseIds = new Set(Object.keys(courseToExamMapping));

const generateExamCourseIdsFromEquivalentCourses = (
  courses: readonly number[]
): { examCourseIds: Set<number>; examEquivalentCourses: Set<string> } => {
  const examCourseIds = new Set<number>();
  const examEquivalentCourses = new Set<string>();
  courses
    .map((course) => course.toString())
    .filter((course) => equivalentCourseIds.has(course))
    .forEach((course) => {
      courseToExamMapping[course].forEach((exam) => examCourseIds.add(exam));
      examEquivalentCourses.add(course);
    });
  return {
    examCourseIds,
    examEquivalentCourses,
  };
};

const addCourseIdsForAssociatedExams = (courses: readonly number[]): number[] => {
  const { examCourseIds } = generateExamCourseIdsFromEquivalentCourses(courses);
  return courses.concat(...examCourseIds);
};

const computeConditionsForExams = (courses: readonly (readonly number[])[]) => {
  const conditions: Record<
    number,
    {
      colleges: string[];
      majorsExcluded?: string[];
    }
  > = {};
  const { examCourseIds, examEquivalentCourses } = generateExamCourseIdsFromEquivalentCourses(courses.flat());
  examCourseIds.forEach((exam) => {
    const { collegeConditions, majorsExcluded } = examRequirementsMapping[exam];
    const validColleges = new Set<string>();
    examToCourseMapping[exam].forEach((course) => {
      if (examEquivalentCourses.has(course.toString()))
        collegeConditions[course].forEach((college) => validColleges.add(college));
    });
    if (validColleges.size === colleges.length) return;
    conditions[exam] = {
      colleges: [...validColleges].sort(),
      ...(majorsExcluded && { majorsExcluded }),
    };
  });
  return conditions;
};

const decorateRequirementWithExams: RequirementDecorator = (requirement) => {
  if (requirement.disallowTransferCredit) {
    return requirement;
  }
  switch (requirement.fulfilledBy) {
    case 'self-check':
      return requirement;
    case 'courses':
    case 'credits': {
      const { courses, conditions, additionalRequirements, ...rest } = requirement;
      const examConditions = computeConditionsForExams(courses);
      const newConditions = {
        ...conditions,
        ...examConditions,
      };
      return {
        ...rest,
        courses: courses.map(addCourseIdsForAssociatedExams),
        ...(Object.keys(newConditions).length !== 0 && { conditions: newConditions }),
        additionalRequirements:
          additionalRequirements &&
          Object.fromEntries(
            Object.entries(additionalRequirements).map(
              ([
                name,
                {
                  courses: additionalRequirementCourses,
                  conditions: additionalRequirementConditions,
                  ...additionalRequirementRest
                },
              ]) => {
                const additionalRequirementExamConditions = computeConditionsForExams(additionalRequirementCourses);
                const additionalRequirementNewConditions = {
                  ...additionalRequirementConditions,
                  ...additionalRequirementExamConditions,
                };
                return [
                  name,
                  {
                    ...additionalRequirementRest,
                    courses: additionalRequirementCourses.map(addCourseIdsForAssociatedExams),
                    ...(Object.keys(additionalRequirementNewConditions).length !== 0 && {
                      conditions: additionalRequirementNewConditions,
                    }),
                  },
                ];
              }
            )
          ),
      };
    }
    case 'toggleable': {
      const { fulfillmentOptions } = requirement;
      return {
        ...requirement,
        fulfillmentOptions: Object.fromEntries(
          Object.entries(fulfillmentOptions).map(([optionName, option]) => {
            const { courses, conditions, ...rest } = option;
            const examConditions = computeConditionsForExams(courses);
            const newConditions = {
              ...conditions,
              ...examConditions,
            };
            return [
              optionName,
              {
                ...rest,
                courses: courses.map(addCourseIdsForAssociatedExams),
                ...(Object.keys(newConditions).length !== 0 && { conditions: newConditions }),
              },
            ];
          })
        ),
      };
    }
    default:
      throw new Error();
  }
};

const sortRequirementCourses: RequirementDecorator = (requirement) => {
  switch (requirement.fulfilledBy) {
    case 'self-check':
      return requirement;
    case 'courses':
    case 'credits': {
      const { courses, additionalRequirements, ...rest } = requirement;
      return {
        ...rest,
        courses: courses.map((c) => [...c].sort((a, b) => a - b)),
        additionalRequirements:
          additionalRequirements &&
          Object.fromEntries(
            Object.entries(additionalRequirements).map(
              ([name, { courses: additionalRequirementsCourses, ...additionalRequirementRest }]) => [
                name,
                {
                  ...additionalRequirementRest,
                  courses: additionalRequirementsCourses.map((c) => [...c].sort((a, b) => a - b)),
                },
              ]
            )
          ),
      };
    }
    case 'toggleable': {
      const { fulfillmentOptions } = requirement;
      return {
        ...requirement,
        fulfillmentOptions: Object.fromEntries(
          Object.entries(fulfillmentOptions).map(([optionName, option]) => {
            const { courses, ...rest } = option;
            return [
              optionName,
              {
                ...rest,
                courses: courses.map((c) => [...c].sort((a, b) => a - b)),
              },
            ];
          })
        ),
      };
    }
    default:
      throw new Error();
  }
};

const generateDecoratedRequirementsJson = (): DecoratedRequirementsJson => {
  const { university, college, major, minor, preProgram } = sourceRequirements;
  type MutableDecoratedJson = {
    university: {
      [key: string]: {
        readonly name: string;
        readonly requirements: readonly DecoratedCollegeOrMajorRequirement[];
      };
    };
    college: {
      [key: string]: {
        readonly name: string;
        readonly requirements: readonly DecoratedCollegeOrMajorRequirement[];
      };
    };
    major: MutableMajorRequirements<DecoratedCollegeOrMajorRequirement>;
    minor: {
      [key: string]: {
        readonly name: string;
        readonly schools: readonly string[];
        readonly requirements: readonly DecoratedCollegeOrMajorRequirement[];
      };
    };
    preProgram: {
      [key: string]: {
        readonly name: string;
        // Unsure if grad programs can be offered by multiple schools, but allows flexibility.
        readonly schools: readonly string[];
        readonly requirements: readonly DecoratedCollegeOrMajorRequirement[];
      };
    };
  };
  const decoratedJson: MutableDecoratedJson = {
    university: {},
    college: {},
    major: {},
    minor: {},
    preProgram: {},
  };
  const decorateRequirements = (requirements: readonly CollegeOrMajorRequirement[]) =>
    applyDecoratorsToRequirements(
      requirements,
      decorateRequirementWithCourses,
      decorateRequirementWithExams,
      sortRequirementCourses
    );
  Object.entries(university).forEach(([universityName, universityRequirement]) => {
    const { requirements, advisors, ...rest } = universityRequirement;
    decoratedJson.university[universityName] = {
      ...rest,
      requirements: decorateRequirements(requirements),
    };
  });
  Object.entries(college).forEach(([collegeName, collegeRequirement]) => {
    const { requirements, advisors, ...rest } = collegeRequirement;
    decoratedJson.college[collegeName] = {
      ...rest,
      requirements: decorateRequirements(requirements),
    };
  });
  Object.entries(major).forEach(([majorName, majorRequirement]) => {
    const { requirements, advisors, specializations, ...rest } = majorRequirement;
    decoratedJson.major[majorName] = {
      ...rest,
      requirements: decorateRequirements(requirements),
      specializations: specializations && decorateRequirements(specializations),
    };
  });
  Object.entries(minor).forEach(([minorName, minorRequirement]) => {
    const { requirements, advisors, ...rest } = minorRequirement;
    decoratedJson.minor[minorName] = {
      ...rest,
      requirements: decorateRequirements(requirements),
    };
  });
  Object.entries(preProgram).forEach(([preProgramName, preProgramRequirement]) => {
    const { requirements, advisors, ...rest } = preProgramRequirement;
    decoratedJson.preProgram[preProgramName] = {
      ...rest,
      requirements: decorateRequirements(requirements),
    };
  });

  // Check no duplicate requirement identifier
  const allRequirementIDs = [
    ...Object.entries(decoratedJson.college).map(([code, requirements]) => ['COLLEGE', code, requirements] as const),
    ...Object.entries(decoratedJson.major).map(([code, requirements]) => ['MAJOR', code, requirements] as const),
    ...Object.entries(decoratedJson.minor).map(([code, requirements]) => ['MINOR', code, requirements] as const),
    ...Object.entries(decoratedJson.preProgram).map(
      ([code, requirements]) => ['PREPROGRAM', code, requirements] as const
    ),
  ].flatMap(([category, code, { requirements }]) => requirements.map((it) => `${category}-${code}-${it.name}`));
  const idSet = new Set(allRequirementIDs);
  if (idSet.size !== allRequirementIDs.length) {
    throw new Error('There are some duplicate requirement IDs!');
  }

  return decoratedJson;
};

const decoratedRequirements = generateDecoratedRequirementsJson();
const decoratedRequirementsString = JSON.stringify(decoratedRequirements, undefined, 2);

writeFileSync('src/requirements/decoratedRequirements.json', decoratedRequirementsString);
