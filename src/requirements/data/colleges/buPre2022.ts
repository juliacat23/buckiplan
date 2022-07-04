import { Course, CollegeOrMajorRequirement } from '@/requirements/types';
import { includesWithSubRequirements } from '../checkers';

const oldbusRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Bookend Courses',
    description: 'Take a launch seminar and a concluding reflection seminar to begin and end the GE program.',
    source: 'https://fisher.osu.edu/undergraduate/academics/degree-requirements',
    checker: includesWithSubRequirements(['GENED 1201'], ['GENED 4001']),

    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['Launch Seminar', 'Reflection Seminar'],
  },
  {
    name: 'Race, Ethnicity, and Gender Diversity',
    description: 'Complete one course for a total of 3 credit hours',
    source: 'https://fisher.osu.edu/undergraduate/academics/degree-requirements',
    checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('AH3') ?? false],
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
    name: 'Literature',
    description:
      'Choose one course. A maximum of one course is permitted from the department of the major across the Literature and Visual and Performing Arts categories, but this course may not be counted on the major.',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('AH2') ?? false],
    fulfilledBy: 'credits',
    perSlotMinCount: [3],
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
    name: 'Social Sciences',
    description:
      'Students in the College of Business are required to complete ECON 2001 and ECON 2002 (or equivalents). Any additional courses selected from this category will count as Open Options',
    source: 'http://fye.osu.edu/glossary.html',
    checker: includesWithSubRequirements(['ECON 2001.01', 'ECON 2001.01H'], ['ECON 2002.01', 'ECON 2002.01H']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['Microeconomics', 'Macroeconomics'],
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
    description:
      'You must complete at least one course from this area, which can overlap with another GE category or the major. If you do not choose an overlapping course, the social diversity requirement must still be met',
    source: 'http://fye.osu.edu/glossary.html',
    checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('SD1') ?? false],
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
export default oldbusRequirements;
