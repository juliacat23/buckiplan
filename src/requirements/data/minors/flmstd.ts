import { CollegeOrMajorRequirement } from '../../types';
import { includesWithSubRequirements } from '../checkers';

const flmstdRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Introductory Coursework',
    description: 'Choose one introduction course from the following',
    source: 'https://artsandsciences.osu.edu/sites/default/files/Film%20Studies%20Mn%20Updt%206-9-21.pdf',
    checker: includesWithSubRequirements(
      ['ENGLISH 2263'],
      ['FILMSTD 2270'],
      ['FILMSTD 2271'],
      ['GERMAN 3351'],
      ['HISTART 2901'],
      ['WGSST 2317']
    ),
    fulfilledBy: 'credits',
    perSlotMinCount: [3],
  },
  {
    name: 'Electives',
    description: 'Choose 12 credits from the following',
    source: 'https://artsandsciences.osu.edu/sites/default/files/MedANTHROP_CRT_Advising%20Sheet%20Final-1.pdf',
    checker: includesWithSubRequirements(
      ['AAAS 4571'],
      ['ACCAD 3350'],
      ['ARTEDUC 5835'],
      ['CHINESE 4405'],
      ['COMPSTD 3607'],
      ['EALL 3446'],
      ['EALL 4407'],
      ['ENGLISH 2263'],
      ['ENGLISH 3378 ']
    ),
    fulfilledBy: 'credits',
    perSlotMinCount: [3],
  },
];

export default flmstdRequirements;
