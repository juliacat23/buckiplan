import { Course, CollegeOrMajorRequirement } from '@/requirements/types';
import { courseMatchesCodeOptions, includesWithSingleRequirement, includesWithSubRequirements } from '../checkers';

const AccountingOpenOption: CollegeOrMajorRequirement = {
  name: 'Open Option',
  description: 'Complete at least 6 credits of Open Option Coursework',
  source: 'http://fye.osu.edu/glossary.html',
  checker: [
    (course: Course): boolean =>
      (!courseMatchesCodeOptions(course, ['ECON 4001.01', 'ECON 4001.02', 'ECON 4001.03']) &&
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
          course.catalogSatisfiesReq?.includes('NS1'))) ??
      false,
  ],
  fulfilledBy: 'credits',
  perSlotMinCount: [6],
  additionalRequirements: {
    'Complete ECON 4001.01, ECON 4001.02 or ECON 4001.03 ': {
      checker: includesWithSingleRequirement('ECON 4001.01', 'ECON 4001.02', 'ECON 4001.03'),
      fulfilledBy: 'credits',
      perSlotMinCount: [3],
    },
    'Select at least one course from any of the GE categories': {
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
  },
};

const CHEM2080: CollegeOrMajorRequirement = {
  name: 'Chemistry',
  description:
    'CHEM 2090 and CHEM 2080 (can also be substituted by CHEM 2150, PHYS 2214, PHYS 2218, BTRY 3080, ECON 3130, MATH 2930, or MATH 4710).',
  source: 'https://www.cs.cornell.edu/undergrad/rulesandproceduresengineering/engineeringchecklist',
  checker: includesWithSubRequirements(
    ['CHEM 2090'],
    ['CHEM 2080', 'CHEM 2150', 'PHYS 2214', 'PHYS 2218', 'BTRY 3080', 'ECON 3130', 'MATH 2930', 'MATH 4710']
  ),
  fulfilledBy: 'courses',
  perSlotMinCount: [1, 1],
  slotNames: ['CHEM 2090', 'CHEM 2080 (or alt)'],
};

export { AccountingOpenOption, CHEM2080 };
