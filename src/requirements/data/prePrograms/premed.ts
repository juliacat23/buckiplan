import { CollegeOrMajorRequirement } from '@/types/requirementTypes';
import { includesWithSubRequirements } from '../checkers';

const premedRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'General Chemistry',
    description: 'Two-semester sequence of General Chemistry',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(
      ['CHEM 1210', 'CHEM 1610', 'CHEM 1910H'],
      ['CHEM 1220', 'CHEM 1620', 'CHEM 1920H']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['General Chemistry I', 'General Chemistry II'],
  },
  {
    name: 'Organic Chemistry',
    description: 'Two semester sequence of Organic Chemistry, with labs',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(
      ['CHEM 2510', 'CHEM 2610', 'CHEM 2910H'],
      ['CHEM 2520', 'CHEM 2620', 'CHEM 2920H'],
      ['CHEM 2540', 'CHEM 2550']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 2],
    slotNames: ['Organic Chemistry I', 'Organic Chemistry II', 'Labs'],
  },
  {
    name: 'Physics',
    description: 'Introductory two-semester Physics sequence',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(
      ['PHYSICS 1200', 'PHYSICS 1250', 'PHYSICS 1250H', 'PHYSICS 1260'],
      ['PHYSICS 1201', 'PHYSICS 1251', 'PHYSICS 1251H', 'PHYSICS 1261']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['Mechanics, Kinematics, Fluids, Waves', 'E&M, Optics, Modern Physics'],
  },
  {
    name: 'Biology',
    description: 'two-semester sequence of biology for science majors',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(
      ['BIOLOGY 1113', 'BIOLOGY 1113H', 'BIOLOGY 1113E', 'BIOLOGY 1113.02'],
      ['BIOLOGY 1114', 'BIOLOGY 1114H', 'BIOLOGY 1114E', 'BIOLOGY 1114.02']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['Energy Transfer and Development', 'Form, Function, Diversity, and Ecology'],
  },
  {
    name: 'Biochemistry',
    description: 'Option 1: BIOCHEM 4511, Option 2: BIOCHEM 5613 + 5614',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    fulfilledBy: 'toggleable',
    fulfillmentOptions: {
      'Option 1': {
        description: 'BIOCHEM 4511',
        checker: includesWithSubRequirements(['BIOCHEM 4511']),
        counting: 'courses',
        perSlotMinCount: [1],
        slotNames: ['Introduction to Biochemistry'],
      },
      'Option 2': {
        description: 'BIOCHEM 5613 and BIOCHEM 5614',
        checker: includesWithSubRequirements(['BIOCHEM 5613'], ['BIOCHEM 5614']),
        counting: 'courses',
        perSlotMinCount: [1, 1],
        slotNames: ['Biochemistry and Molecular Biology I', 'Biochemistry and Molecular Biology II'],
      },
    },
  },
];

export default premedRequirements;
