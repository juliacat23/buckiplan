import { CollegeOrMajorRequirement } from '@/requirements/types';
import { includesWithSingleRequirement, includesWithSubRequirements } from '../checkers';

const scieducRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Pre-Major Requirements',
    description:
      'Complete the following courses for admission into the major. Students can choose between HDFS 2420 and ESEPSY 5401 to fulfill the third course requirement',
    source: 'https://ehe.osu.edu/undergraduate/science-and-mathematics-education',
    checker: includesWithSubRequirements(['EDUCST 2189S'], ['ESPHE 3410'], ['HDFS 2420']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1],
    slotNames: ['FEEP', 'Philosophy of Education', 'Adolescent Learning/Development'],
  },
  {
    name: 'Major Course Requirements',
    description: 'Complete all of the following courses below',
    source: 'https://ehe.osu.edu/undergraduate/science-and-mathematics-education',
    checker: includesWithSubRequirements(
      ['EDUTL 5501'],
      ['EDUTL 5005'],
      ['EDUTL 5442'],
      ['EDUTL 5721'],
      ['EDUTL 5722'],
      ['EDUTL 5741'],
      ['EDUTL 5744'],
      ['EDUTL 5745'],
      ['EDUTL 3189.07'],
      ['EDUTL 4189.07'],
      ['EDUTL 5195.07'],
      ['EDUTL 5191.07']
    ),
    fulfilledBy: 'credits',
    perSlotMinCount: [43],
  },
];

export default scieducRequirements;
