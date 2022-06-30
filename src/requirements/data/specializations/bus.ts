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

const intBusForeignLanguage: CollegeOrMajorRequirement = {
  name: 'Foreign Language',
  description: 'coursework or proficiency through the third semester (1103) of amodern foreign language is required.',
  source: 'https://www.cs.cornell.edu/undergrad/rulesandproceduresengineering/engineeringchecklist',
  checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('FL1') ?? false],
  fulfilledBy: 'courses',
  perSlotMinCount: [3],
  slotNames: ['FL'],
};

export { AccountingOpenOption, intBusForeignLanguage };
