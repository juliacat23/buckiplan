import { CollegeOrMajorRequirement } from '@/requirements/types';
import { includesWithSingleRequirement, includesWithSubRequirements } from '../checkers';

const pubhealthenvRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Major Admission Requirements',
    description: 'Courses to be completed before applying to the BSPH Major. All Courses overlap with GE requirements',
    source: 'https://fisher.osu.edu/undergraduate/academics/degree-requirements',
    checker: includesWithSubRequirements(
      ['ENGLISH 1110.01', 'ENGLISH 1110.01H', 'ENGLISH 1110.02', 'ENGLISH 1110.02H'],
      ['MATH 1148', 'MATH 1149', 'MATH 1150', 'MATH 1151'],
      ['BIOLOGY 1113', 'BIOLOGY 1113H', 'BIOLOGY 1113E'],
      ['SOCIOL 1101', 'SOCIOL 1101H']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1, 1],
    slotNames: ['First-Year Composition', 'Math', 'Biology I', 'Sociology'],
  },
  {
    name: 'Foundation Courses',
    description:
      'Intro-level math and programming courses. Must be taken in your first two years of the business curriculum',
    source: 'https://fisher.osu.edu/undergraduate/academics/degree-requirements',
    checker: includesWithSubRequirements(
      ['PUBHBIO 2210', 'PUBHBIO 2210H'],
      ['PUBHEHS 3310'],
      ['PUBHLTH 2010'],
      ['PUBHHBP 3510'],
      ['PUBHEPI 2410'],
      ['PUBHHMP 3610']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1, 1, 1, 1],
    slotNames: [
      'Biostatistics',
      'Current Issues in Global Environmental Health',
      'Global Public Health',
      'Behavior in Public Health',
      'Epidemiology',
      'Health Care',
    ],
  },
  {
    name: 'Public Health Core',
    description: 'Select at least 3 of the following courses',
    source: 'https://fisher.osu.edu/undergraduate/academics/degree-requirements',
    checker: includesWithSingleRequirement(
      'PUBHEPI 5411',
      'PUBHEPI 5412',
      'PUBHEPI 5438',
      'PUBHEHS 3320',
      'PUBHEHS 4530',
      'PUBHEHS 4325',
      'PUBHEHS 5315',
      'PUBHEHS 5325'
    ),
    fulfilledBy: 'credits',
    perSlotMinCount: [9],
  },
  {
    name: 'Chemistry Core',
    description:
      'Complete a two-semester sequence of General Chemistry and a one-semester sequence of Organic Chemistry with a lab',
    source: 'https://fisher.osu.edu/undergraduate/academics/degree-requirements',
    checker: includesWithSubRequirements(
      ['CHEM 1210', 'CHEM 1610', 'CHEM 1910H', 'CHEM 1910'],
      ['CHEM 1220', 'CHEM 1620', 'CHEM 1920', 'CHEM 1920H'],
      ['CHEM 2510', 'CHEM 2910H', 'CHEM 2910'],
      ['CHEM 2540']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1, 1],
    slotNames: ['General Chemistry I', 'General Chemistry II', 'Organic Chemistry I', 'Organic Chemistry I Lab'],
  },
  {
    name: 'Earth Science Core',
    description: 'Select at least 3 of the following courses',
    source: 'https://fisher.osu.edu/undergraduate/academics/degree-requirements',
    checker: includesWithSingleRequirement(
      'EARTHSC 2203',
      'EARTHSC 2204',
      'EARTHSC 3411',
      'EARTHSC 5203',
      'EARTHSC 5663'
    ),
    fulfilledBy: 'credits',
    perSlotMinCount: [9],
  },
  {
    name: 'Capstone Experience',
    description: 'Complete PUBHLTH 3180 or 3180E and Choose 1 Course From the following below:',
    source: 'https://data-analytics.osu.edu/major/core-curriculum',
    checker: includesWithSubRequirements(
      ['PUBHLTH 3180', 'PUBHLTH 3180E'],
      [
        'PUBHLTH 3189.03',
        'PUBHLTH 3189.03E',
        'PUBHLTH 3191',
        'PUBHLTH 3191E',
        'PUBHLTH 3999',
        'PUBHLTH 4999',
        'PUBHLTH 4999.01H',
      ]
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['Capstone Preparation', 'Capstone'],
  },
  {
    name: 'Major Electives',
    description:
      'Select six credits from interdisciplinary specialization courses not already used. Other approved courses that fulfill Major Electives: EARTHSC 5651, ENR 2100, 3000, GEOG 2800, 5220, PUBHLTH 5015, 5330, 3998',
    source: 'https://data-analytics.osu.edu/major/core-curriculum',
    checker: includesWithSingleRequirement(
      'EARTHSC 5651',
      'ENR 2100',
      'ENR 3000',
      'GEOG 2800',
      'GEOG 5200',
      'EARTHSC 2203',
      'EARTHSC 2204',
      'EARTHSC 3411',
      'EARTHSC 5203',
      'EARTHSC 5663',
      'PUBHEPI 5411',
      'PUBHEPI 5412',
      'PUBHEPI 5438',
      'PUBHEHS 3320',
      'PUBHEHS 4530',
      'PUBHEHS 4325',
      'PUBHEHS 5315',
      'PUBHEHS 5325'
    ),
    fulfilledBy: 'credits',
    perSlotMinCount: [5],
  },
];

export default pubhealthenvRequirements;
