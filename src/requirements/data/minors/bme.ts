import { CollegeOrMajorRequirement, Course } from '@/requirements/types';
import { ifCodeMatch, includesWithSingleRequirement } from '../checkers';

const introRequirement: CollegeOrMajorRequirement = {
  name: 'Introduction Requirements',
  description: 'Complete BIOMEDE 2000, the introduction to Biomedical Engineering course',
  source: 'https://bme.osu.edu/sites/default/files/uploads/curriculum/bme_minor.pdf',
  checker: includesWithSingleRequirement('BIOMEDE 2000'),
  fulfilledBy: 'credits',
  perSlotMinCount: [3],
};

const scienceRequirement: CollegeOrMajorRequirement = {
  name: 'Science Coursework',
  description:
    'Complete a physiology or biological science course at the 2000 level or higher.' +
    '\n' +
    '\n' +
    'Examples include ANATOMY 2200, BIOCHEM 4511, and EEOB 2520',
  source: 'https://bme.osu.edu/sites/default/files/uploads/curriculum/bme_minor.pdf',
  checker: includesWithSingleRequirement('BIOMEDE 2000'),
  fulfilledBy: 'credits',
  checkerWarning: 'We do not check if course is classified as a physiology or biological science course',
  perSlotMinCount: [3],
};

const domainRequirement: CollegeOrMajorRequirement = {
  name: 'Domain Course',
  description: 'Complete at least one "domain" course',
  source: 'https://bme.osu.edu/sites/default/files/uploads/curriculum/bme_minor.pdf',
  checker: includesWithSingleRequirement(
    'BIOMEDE 4110',
    'BIOMEDE 4210',
    'BIOMEDE 4310',
    'BIOMEDE 4410',
    'BIOMEDE 4510',
    'BIOMEDE 4610'
  ),
  fulfilledBy: 'credits',
  perSlotMinCount: [3],
};

const electiveRequirement: CollegeOrMajorRequirement = {
  name: 'Elective',
  description: 'Complete at least 3 credit hours of electives coursework',
  source: 'https://bme.osu.edu/sites/default/files/uploads/curriculum/bme_minor.pdf',
  checker: includesWithSingleRequirement(
    'BIOMEDE 5001',
    'BIOMEDE 5110',
    'BIOMEDE 5120',
    'BIOMEDE 5186',
    'BIOMEDE 5310',
    'BIOMEDE 5353',
    'BIOMEDE 5420',
    'BIOMEDE 5421',
    'BIOMEDE 5470',
    'BIOMEDE 5510',
    'BIOMEDE 5560',
    'BIOMEDE 5580',
    'BIOMEDE 5610',
    'BIOMEDE 5635',
    'BIOMEDE 5639',
    'BIOMEDE 5661',
    'BIOMEDE 5662',
    'BIOMEDE 5663',
    'BIOMEDE 5667',
    'BIOMEDE 5668',
    'BIOMEDE 4110',
    'BIOMEDE 4210',
    'BIOMEDE 4310',
    'BIOMEDE 4410',
    'BIOMEDE 4510',
    'BIOMEDE 4610'
  ),
  fulfilledBy: 'credits',
  perSlotMinCount: [3],
};

const bmeRequirements: readonly CollegeOrMajorRequirement[] = [
  introRequirement,
  scienceRequirement,
  domainRequirement,
  electiveRequirement,
];

export default bmeRequirements;
