import { Course, CollegeOrMajorRequirement } from '@/requirements/types';
import { ifCodeMatch, includesWithSingleRequirement } from '../checkers';

const pubhealthRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Writing',
    description:
      'Complete a 3 credit hours of a first year writing course and 3 credit hours of a second year writing course for a total of 6 writing credits',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [
      (course: Course): boolean => course.catalogSatisfiesReq?.includes('WR1') ?? false,
      (course: Course): boolean => course.catalogSatisfiesReq?.includes('WR2') ?? false,
    ],

    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['First Year Writing', 'Second Year Writing'],
  },
  {
    name: 'Literature',
    description:
      'Choose one course. A maximum of one course is permitted from the department of the major across the Literature and Visual and Performing Arts categories, but this course may not be counted on the major.',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('AH2') ?? false],
    fulfilledBy: 'credits',
    perSlotMinCount: [3],
  },
  {
    name: 'Visual and Performing Arts',
    description:
      'Choose one course. A maximum of one course is permitted from the department of the major across the Literature and Visual and Performing Arts categories, but this course may not be counted on the major.',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('AH3') ?? false],
    fulfilledBy: 'credits',
    perSlotMinCount: [3],
  },
  {
    name: 'Mathematics',
    description: 'Complete MATH 1116 or higher Math GE course',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [
      (course: Course): boolean => {
        const { catalogNbr, subject } = course;
        return ifCodeMatch(subject, 'MATH') && !ifCodeMatch(catalogNbr, '15**');
      },
    ],
    fulfilledBy: 'credits',
    perSlotMinCount: [3],
  },
  {
    name: 'Data Analysis',
    description: 'Complete SOCIOL 3549: Statistics in Sociology',
    source: 'http://fye.osu.edu/glossary.html',
    checker: includesWithSingleRequirement('SOCIOL 3549'),
    fulfilledBy: 'credits',
    perSlotMinCount: [3],
  },
  {
    name: 'Natural Science',
    description: 'Complete a minimum of 10 credit hours',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [
      (course: Course): boolean =>
        (course.catalogSatisfiesReq?.includes('NS1') || course.catalogSatisfiesReq?.includes('NS2')) ?? false,
    ],
    fulfilledBy: 'credits',
    perSlotMinCount: [10],
    additionalRequirements: {
      'Complete at least one course in the Biological Sciences with a lab ': {
        checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('NS1') ?? false],
        fulfilledBy: 'credits',
        perSlotMinCount: [4],
      },
      'Complete at least one course in the Physical Sciences with a lab ': {
        checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('NS2') ?? false],
        fulfilledBy: 'credits',
        perSlotMinCount: [4],
      },
    },
  },
  {
    name: 'Historical Study',
    description: 'Choose one course from the following list.',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('AH1') ?? false],
    fulfilledBy: 'credits',
    perSlotMinCount: [3],
  },
  {
    name: 'Culture and Ideas',
    description: 'Complete at least one course from the following',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [
      (course: Course): boolean =>
        (course.catalogSatisfiesReq?.includes('AH4') || course.catalogSatisfiesReq?.includes('AH1')) ?? false,
    ],
    fulfilledBy: 'credits',
    allowCourseDoubleCounting: true,
    perSlotMinCount: [3],
  },
  {
    name: 'Social Sciences',
    description: 'Complete two social science courses for a total of 6 credits ',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [
      (course: Course): boolean =>
        (course.catalogSatisfiesReq?.includes('NS1') || course.catalogSatisfiesReq?.includes('NS2')) ?? false,
    ],
    fulfilledBy: 'credits',
    perSlotMinCount: [10],
    additionalRequirements: {
      'Complete SOCIOL 1101: Introduction to Sociology': {
        checker: includesWithSingleRequirement('SOCIOL 1101'),
        fulfilledBy: 'credits',
        perSlotMinCount: [3],
      },
      'Choose a social sciences course from Group A or Group C ': {
        checker: [
          (course: Course): boolean =>
            (course.catalogSatisfiesReq?.includes('SD1') || course.catalogSatisfiesReq?.includes('SD2')) ?? false,
        ],
        fulfilledBy: 'credits',
        perSlotMinCount: [3],
      },
    },
  },
  {
    name: 'Foreign Language',
    description: 'You must complete course work through the third language course (1103 or equivalent). ',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('FL1') ?? false],
    fulfilledBy: 'credits',
    allowCourseDoubleCounting: true,
    perSlotMinCount: [12],
  },
  {
    name: 'Global Studies',
    description:
      'You must complete at least two courses from this area. Each course can overlap with another GE category or the major. If you do not choose overlapping courses, the global studies requirement must still be met. ',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('SD2') ?? false],
    fulfilledBy: 'credits',
    allowCourseDoubleCounting: true,
    perSlotMinCount: [6],
  },
  {
    name: 'Social Diversity in the US',
    description: 'SOCIOL 1101, required as a Social Sciences GE, already fulfils this requirement.',
    source: 'http://fye.osu.edu/glossary.html',
    checker: includesWithSingleRequirement('SOCIOL 1101'),
    fulfilledBy: 'credits',
    allowCourseDoubleCounting: true,
    perSlotMinCount: [3],
  },
  {
    name: 'Open Option',
    description: 'Complete 6 credits of courses from any GE category',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [
      (course: Course): boolean =>
        (course.catalogSatisfiesReq?.includes('WR2') ||
          course.catalogSatisfiesReq?.includes('AH1') ||
          course.catalogSatisfiesReq?.includes('AH2') ||
          course.catalogSatisfiesReq?.includes('AH3') ||
          course.catalogSatisfiesReq?.includes('AH4') ||
          course.catalogSatisfiesReq?.includes('SD1') ||
          course.catalogSatisfiesReq?.includes('SD2') ||
          course.catalogSatisfiesReq?.includes('SS1') ||
          course.catalogSatisfiesReq?.includes('SS2') ||
          course.catalogSatisfiesReq?.includes('SS3') ||
          course.catalogSatisfiesReq?.includes('NS1') ||
          course.catalogSatisfiesReq?.includes('NS1')) ??
        false,
    ],
    fulfilledBy: 'credits',
    perSlotMinCount: [3],
  },
];
// offers two undergraduate majors: AEM and Hotel Admin
export default pubhealthRequirements;
