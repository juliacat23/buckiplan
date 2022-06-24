import { Course, CollegeOrMajorRequirement } from '@/requirements/types';
import { includesWithSubRequirements } from '../checkers';

const predentRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Biology',
    description: 'Two-semester sequence of biology for science majors',
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
  {
    name: 'Microbiology',
    description: 'Basic & Practical Microbiology course for health professionals',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(['MICROBIO 4000.01', 'MICRBIO 4000.02']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Practical Microbiology'],
  },
  {
    name: 'Physiology',
    description: 'One semester Physiology course; lab is not required',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(['EEOB 2520', 'PHYSIO 3200']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Human Physiology'],
  },
  {
    name: 'Physics',
    description: 'Introductory Physics course',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(['PHYSICS 1200', 'PHYSICS 1250', 'PHYSICS 1250H', 'PHYSICS 1260']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Mechanics, Kinematics, Fluids, Waves'],
  },
  {
    name: 'English',
    description: 'Completion of both first year and second year writing courses',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: [
      (course: Course): boolean => course.catalogSatisfiesReq?.includes('WR1') ?? false,
      (course: Course): boolean => course.catalogSatisfiesReq?.includes('WR2') ?? false,
    ],
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['First-Year English Composition', 'Second-Year Writing'],
  },
];

export default predentRequirements;
