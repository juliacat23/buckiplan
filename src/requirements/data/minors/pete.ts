import { CollegeOrMajorRequirement, Course } from '@/requirements/types';
import { includesWithSingleRequirement } from '../checkers';

const requiredRequirement: CollegeOrMajorRequirement = {
  name: 'Core Courses',
  description: 'Complete the following four courses for a total of 12 credit hours',
  source: 'https://artsandsciences.osu.edu/sites/artsandsciences.osu.edu/files/minor-petroleum-engineering.pdf',
  checker: includesWithSingleRequirement('EARTHSC 5661', 'CBE 5200', 'CBE 5210', 'CBE 5230'),
  fulfilledBy: 'credits',
  perSlotMinCount: [12],
};

const electiveRequirement: CollegeOrMajorRequirement = {
  name: 'Elective',
  description: 'Choose one elective course from the following',
  source: 'https://artsandsciences.osu.edu/sites/artsandsciences.osu.edu/files/minor-petroleum-engineering.pdf',
  checker: includesWithSingleRequirement('EARTHSC 5751', 'EARTHSC 5687', 'CBE 5240', 'CBE 5250', 'CBE 5260'),
  fulfilledBy: 'credits',
  perSlotMinCount: [3],
};

const peteRequirements: readonly CollegeOrMajorRequirement[] = [requiredRequirement, electiveRequirement];

export default peteRequirements;
