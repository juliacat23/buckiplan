import { colleges, College } from './data';
import examData, { ExamFulfillment, ExamFulfillments, OTHER_COLLEGES } from './data/exams/examCredit';

type ExamRequirementsCollegeConditions = Record<number, College[]>;
type ExamRequirementsConditions = {
  /** If the user IS NOT in one of these colleges, the course id cannot fulfill the requirement. */
  collegeConditions: ExamRequirementsCollegeConditions;
  /** If the user IS in one of these majors, the course id cannot fulfill the requirement. */
  majorsExcluded?: string[];
};

const examFulfillmentList: ExamFulfillment[] = Object.values(examData)
  .map((examFulfillments: ExamFulfillments) => Object.values(examFulfillments))
  .flat(2);

export const examCourseIds: Set<number> = new Set(examFulfillmentList.map(({ courseId }) => courseId));

export const examRequirementsMapping: Record<number, ExamRequirementsConditions> = examFulfillmentList.reduce(
  (mapping, fulfillment) => {
    const { courseId, courseEquivalents, majorsExcluded } = fulfillment;

    if (!courseEquivalents) {
      // if no course equivalents, exam will never be looked up
      return mapping;
    }

    // for each id, assign a list of colleges for which the exam can fulfill requirements
    const definedColleges = new Set(Object.keys(courseEquivalents));
    const otherColleges = colleges.filter((c: College) => !definedColleges.has(c)); // explicit expansion of OTHER_COLLEGES
    const collegeConditions = Object.entries(courseEquivalents).reduce(
      (conditions: ExamRequirementsCollegeConditions, [college, courses]) => {
        courses.forEach((course) => {
          if (college === OTHER_COLLEGES) {
            conditions[course] = otherColleges;
            return;
          }
          if (!conditions[course]) conditions[course] = [];
          if (conditions[course].includes(college as College)) return;
          conditions[course] = [...conditions[course], college as College];
        });
        return conditions;
      },
      {}
    );

    if (!majorsExcluded) {
      // if no majors excluded, just add the college conditions
      return {
        ...mapping,
        [courseId]: {
          collegeConditions,
        },
      };
    }

    return {
      ...mapping,
      [courseId]: {
        collegeConditions,
        majorsExcluded,
      },
    };
  },
  {}
);

export const examToCourseMapping: Record<string, number[]> = Object.fromEntries(
  Object.entries(examRequirementsMapping).map(([id, conditions]) => [
    id,
    Object.keys(conditions.collegeConditions).map((k) => parseInt(k, 10)),
  ])
);

export const courseToExamMapping: Record<string, number[]> = Object.entries(examToCourseMapping).reduce(
  (mapping: Record<number, number[]>, [id, courses]) => {
    courses.forEach((course) => {
      if (!mapping[course]) mapping[course] = [];
      mapping[course] = [...mapping[course], parseInt(id, 10)];
    });
    return mapping;
  },
  {}
);
