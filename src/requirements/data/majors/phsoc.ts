import { CollegeOrMajorRequirement } from '@/requirements/types';
import { includesWithSingleRequirement, includesWithSubRequirements } from '../checkers';

const pubhealthsocRequirements: readonly CollegeOrMajorRequirement[] = [
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
    name: 'Interdisciplinary Specialization Courses',
    description: 'Intro-level business courses to be taken in the first two years of the business curriculum',
    source: 'https://fisher.osu.edu/undergraduate/academics/degree-requirements',
    checker: includesWithSingleRequirement(
      'PUBHEHS 3320',
      'PUBHEHS 4325',
      'PUBHEPI 5411',
      'PUBHEPI 5412',
      'SOCIOL 3463',
      'SOCIOL 3487',
      'SOCIOL 3630',
      'SOCIOL 5450',
      'SOCIOL 5629'
    ),
    fulfilledBy: 'credits',
    perSlotMinCount: [27],
  },
  {
    name: 'Focus Area',
    description: 'Complete 9 credits from one of the following focus areas',
    source: 'https://data-analytics.osu.edu/major/specialization',
    fulfilledBy: 'toggleable',
    fulfillmentOptions: {
      'Criminology/Violence': {
        description: '',
        counting: 'credits',
        checker: includesWithSingleRequirement(
          'SOCIOL 3315',
          'SOCIOL 3410',
          'SOCIOL 3410H',
          'SOCIOL 4506',
          'SOCIOL 4508',
          'SOCIOL 4509',
          'SOCIOL 4610',
          'SOCIOL 4611',
          'SOCIOL 4615',
          'SOCIOL 5525',
          'SOCIOL 5618'
        ),
        perSlotMinCount: [9],
      },
      Global: {
        description: '',
        counting: 'credits',
        checker: includesWithSingleRequirement(
          'SOCIOL 3315',
          'SOCIOL 3302',
          'SOCIOL 3460',
          'SOCIOL 3597.02',
          'SOCIOL 5525'
        ),
        perSlotMinCount: [9],
      },
      'Maternal and Child Health': {
        description: '',
        counting: 'credits',
        checker: includesWithSingleRequirement(
          'SOCIOL 3200',
          'SOCIOL 3306',
          'SOCIOL 3434',
          'SOCIOL 3435',
          'SOCIOL 3597.02',
          'SOCIOL 4511'
        ),
        perSlotMinCount: [9],
      },
      Policy: {
        description: '',
        counting: 'credits',
        checker: includesWithSingleRequirement(
          'SOCIOL 3306',
          'SOCIOL 3434',
          'SOCIOL 3460',
          'SOCIOL 4506',
          'SOCIOL 4509',
          'SOCIOL 4609'
        ),
        perSlotMinCount: [9],
      },
      'Poverty/Inequality': {
        description: '',
        counting: 'credits',
        checker: includesWithSingleRequirement(
          'SOCIOL 3200',
          'SOCIOL 3306',
          'SOCIOL 3380',
          'SOCIOL 3434',
          'SOCIOL 3460',
          'SOCIOL 3464',
          'SOCIOL 4609'
        ),
        perSlotMinCount: [9],
      },
      'Social Constructs of Gender': {
        description: '',
        counting: 'credits',
        checker: includesWithSingleRequirement(
          'SOCIOL 3315',
          'SOCIOL 3435',
          'SOCIOL 4508',
          'SOCIOL 4635',
          'SOCIOL 4655',
          'SOCIOL 4611',
          'SOCIOL 5525',
          'SOCIOL 5605'
        ),
        perSlotMinCount: [9],
      },
    },
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
      'Select 5 credits from any Sociology course not already used. Other approved Major Elective courses: PUBHLTH 3998, PUBHLTH 5015, PUBHEHS 5330, KNSFHP 2250, 3312, 3314 ',
    source: 'https://data-analytics.osu.edu/major/core-curriculum',
    checker: includesWithSingleRequirement(
      'PUBHLTH 3998',
      'PUBHLTH 5015',
      'PUBHEHS 5330',
      'KNSFHP 2250',
      'KNSFHP 3312',
      'KNSFHP 3314',
      'SOCIOL 3315',
      'SOCIOL 3435',
      'SOCIOL 4508',
      'SOCIOL 4635',
      'SOCIOL 4655',
      'SOCIOL 4611',
      'SOCIOL 5525',
      'SOCIOL 5605',
      'SOCIOL 3200',
      'SOCIOL 3306',
      'SOCIOL 3380',
      'SOCIOL 3434',
      'SOCIOL 3460',
      'SOCIOL 3464',
      'SOCIOL 4609',
      'SOCIOL 3306',
      'SOCIOL 3434',
      'SOCIOL 3460',
      'SOCIOL 4506',
      'SOCIOL 4509',
      'SOCIOL 4609',
      'SOCIOL 3200',
      'SOCIOL 3306',
      'SOCIOL 3434',
      'SOCIOL 3435',
      'SOCIOL 3597.02',
      'SOCIOL 4511',
      'SOCIOL 3315',
      'SOCIOL 3302',
      'SOCIOL 3460',
      'SOCIOL 3597.02',
      'SOCIOL 5525',
      'SOCIOL 3315',
      'SOCIOL 3410',
      'SOCIOL 3410H',
      'SOCIOL 4506',
      'SOCIOL 4508',
      'SOCIOL 4509',
      'SOCIOL 4610',
      'SOCIOL 4611',
      'SOCIOL 4615',
      'SOCIOL 5525',
      'SOCIOL 5618'
    ),
    fulfilledBy: 'credits',
    perSlotMinCount: [5],
  },
];

export default pubhealthsocRequirements;
