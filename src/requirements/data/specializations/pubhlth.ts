import { Course, CollegeOrMajorRequirement } from '@/requirements/types';
import { courseMatchesCodeOptions, includesWithSingleRequirement, includesWithSubRequirements } from '../checkers';

const envDataAnalysis: CollegeOrMajorRequirement = {
  name: 'Data Analysis',
  description: 'Complete either STAT 1350 or STAT 1450',
  source: 'http://fye.osu.edu/glossary.html',
  checker: includesWithSingleRequirement('STAT 1350.01', 'STAT 1450.01'),
  fulfilledBy: 'credits',
  perSlotMinCount: [4],
};

const envNaturalScience: CollegeOrMajorRequirement = {
  name: 'Natural Sciences',
  description:
    'Complete the following required courses in Biology, Physics, and Microbiology. Select one course from each category',
  source: 'https://www.cs.cornell.edu/undergrad/rulesandproceduresengineering/engineeringchecklist',
  checker: includesWithSubRequirements(
    ['BIOLOGY 1113', 'BIOLOGY 1113H', 'BIOLOGY 1113E'],
    ['PHYSICS 1200', 'PHYSICS 1250'],
    ['MICROBIO 4000.01', 'MICROBIO 4000.02']
  ),
  fulfilledBy: 'courses',
  perSlotMinCount: [1, 1, 1],
  slotNames: ['Biology', 'Physics', 'Microbiology'],
};
const envMath: CollegeOrMajorRequirement = {
  name: 'Mathematics',
  description: 'Introductionary Mathematics. Option 1: MATH 1148 + MATH 1149; Option 2: MATH 1150',
  source: 'https://www.cs.cornell.edu/undergrad/rulesandproceduresengineering/engineeringchecklist',
  fulfilledBy: 'toggleable',
  fulfillmentOptions: {
    'Option 1': {
      description: 'MATH 1148 and MATH 1149',
      checker: includesWithSubRequirements(['MATH 1148'], ['MATH 1149']),
      counting: 'courses',
      perSlotMinCount: [1, 1],
      slotNames: ['College Algebra', 'Trigonometry'],
    },
    'Option 2': {
      description: 'MATH 1150',
      checker: includesWithSubRequirements(['MATH 1150']),
      counting: 'courses',
      perSlotMinCount: [1],
      slotNames: ['Pre-Calculus'],
    },
  },
};

const envOpenOption: CollegeOrMajorRequirement = {
  name: 'Open Option',
  description:
    'Coursework in Calculus I and Biology fulfils the Open Option GE Category. Select 1 Biology course and 1 Calculus course',
  source: 'http://fye.osu.edu/glossary.html',
  checker: includesWithSubRequirements(
    ['BIOLOGY 1114', 'BIOLOGY 1114E', 'BIOLOGY 1114H'],
    ['MATH 1151', 'MATH 1181', 'MATH 1161']
  ),
  fulfilledBy: 'courses',
  perSlotMinCount: [1, 1],
  slotNames: ['Biology', 'Calculus I'],
};

export { envDataAnalysis, envOpenOption, envMath };
