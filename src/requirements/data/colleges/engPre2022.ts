import { CollegeOrMajorRequirement, Course } from '@/requirements/types';
import { includesWithSingleRequirement } from '../checkers';

const writingRequirement: CollegeOrMajorRequirement = {
  name: 'Writing',
  description: 'Select two courses, one per subgroup',
  source: 'https://advising.engineering.osu.edu/current-students/curriculum/general-education',
  checker: [
    (course: Course): boolean => course.catalogSatisfiesReq?.includes('WR1') ?? false,
    (course: Course): boolean => course.catalogSatisfiesReq?.includes('WR2') ?? false,
  ],

  fulfilledBy: 'courses',
  perSlotMinCount: [1, 1],
  slotNames: ['First Year Writing', 'Second Year Writing'],
};

const socialSciencesRequiement: CollegeOrMajorRequirement = {
  name: 'Social Sciences',
  description: 'Select two courses, no more than one per subgroup, for a total of 6 credit hours',
  source: 'https://advising.engineering.osu.edu/current-students/curriculum/general-education',
  checker: [
    (course: Course): boolean => course.catalogSatisfiesReq?.includes('SS1') ?? false,
    (course: Course): boolean => course.catalogSatisfiesReq?.includes('SS2') ?? false,
    (course: Course): boolean => course.catalogSatisfiesReq?.includes('SS3') ?? false,
  ],
  fulfilledBy: 'courses',
  perSlotMinCount: [1, 1, 1],
  slotNames: ['Individuals & Groups', 'Organizations & Polities', 'Human, Natural, & Economic Resources'],
  minNumberOfSlots: 2,
};

const historyRequirement: CollegeOrMajorRequirement = {
  name: 'Historical Study',
  description: 'Choose one course',
  source: 'https://advising.engineering.osu.edu/current-students/curriculum/general-education',
  checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('AH1') ?? false],
  fulfilledBy: 'credits',
  perSlotMinCount: [3],
};

const humanitiesRequirement: CollegeOrMajorRequirement = {
  name: 'Arts & Humanities',
  description: 'Select two courses, one per subgroup',
  source: 'https://advising.engineering.osu.edu/current-students/curriculum/general-education',
  checker: [
    (course: Course): boolean => course.catalogSatisfiesReq?.includes('AH2') ?? false,
    (course: Course): boolean => course.catalogSatisfiesReq?.includes('AH3') ?? false,
  ],

  fulfilledBy: 'courses',
  perSlotMinCount: [1, 1],
  slotNames: ['Literature', 'Visual and Performing Arts'],
};

const breadthRequirement: CollegeOrMajorRequirement = {
  name: 'Breadth',
  description:
    'Select one course from Historical Study or Cultures & Ideas. Credit for a foreign language sequence through 1103, or credit for a foreign language course with a prerequisite of 1103, can be used to satisfy the Cultures & Ideas Gen Ed category',
  source: 'https://advising.engineering.osu.edu/current-students/curriculum/general-education',
  checker: [
    (course: Course): boolean =>
      (course.catalogSatisfiesReq?.includes('AH1') ||
        course.catalogSatisfiesReq?.includes('AH3') ||
        course.catalogSatisfiesReq?.includes('FL')) ??
      false,
  ],

  fulfilledBy: 'credits',
  perSlotMinCount: [3],
};
/** @type {*} */
const ethicsRequirement: CollegeOrMajorRequirement = {
  name: 'Professional Ethics',
  description: 'Select one course. This category permits overlap with another Gen Ed category.',
  source: 'https://advising.engineering.osu.edu/current-students/curriculum/general-education',
  checker: includesWithSingleRequirement(
    'ECON 3048',
    'SOCIOL 3302',
    'BIOETHC 2010',
    'COMPSTD 2341',
    'PHILOS 1332',
    'PHILOS 1337',
    'PHILOS 1338',
    'NAVALSC 4210'
  ),
  fulfilledBy: 'credits',
  perSlotMinCount: [3],
  /** permits overlap with another GE category */
  allowCourseDoubleCounting: true,
};

const diversityRequirement: CollegeOrMajorRequirement = {
  name: 'Diversity',
  description: 'Select one course. This category permits overlap with another Gen Ed course',
  source: 'https://advising.engineering.osu.edu/current-students/curriculum/general-education',
  checker: [
    (course: Course): boolean =>
      (course.catalogSatisfiesReq?.includes('SD1') || course.catalogSatisfiesReq?.includes('SD2')) ?? false,
  ],
  fulfilledBy: 'credits',
  perSlotMinCount: [3],
  /** permits overlap with another GE category */
  allowCourseDoubleCounting: true,
};

const engPre2022Requirements: readonly CollegeOrMajorRequirement[] = [
  writingRequirement,
  socialSciencesRequiement,
  historyRequirement,
  humanitiesRequirement,
  breadthRequirement,
  ethicsRequirement,
  diversityRequirement,
];

export default engPre2022Requirements;
