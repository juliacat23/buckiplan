import { CollegeOrMajorRequirement } from '../../types';
import { includesWithSubRequirements } from '../checkers';

const medanthRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Required Courses',
    description: 'Complete the following required courses for a total of 9 credits',
    source: 'https://artsandsciences.osu.edu/sites/default/files/MedANTHROP_CRT_Advising%20Sheet%20Final-1.pdf',
    checker: includesWithSubRequirements(['ANTHROP 3302'], ['ANTHROP 5650'], ['ANTHROP 5702']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['Introduction to Medical Anthropology', 'Research Design', 'Clinical Anthropology'],
  },
  {
    name: 'Electives',
    description: 'Choose one course from the following',
    source: 'https://artsandsciences.osu.edu/sites/default/files/MedANTHROP_CRT_Advising%20Sheet%20Final-1.pdf',
    checker: includesWithSubRequirements(
      ['ANTHROP 3340'],
      ['ANTHROP 5600'],
      ['ANTHROP 5601'],
      ['ANTHROP 5602'],
      ['ANTHROP 5615'],
      ['ANTHROP 5624'],
      ['ANTHROP 5642'],
      ['ANTHROP 5700'],
      ['ANTHROP 5701']
    ),
    fulfilledBy: 'credits',
    perSlotMinCount: [3],
  },
];

export default medanthRequirements;
