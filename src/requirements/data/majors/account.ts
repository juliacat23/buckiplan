import { CollegeOrMajorRequirement } from '@/requirements/types';
import { includesWithSingleRequirement, includesWithSubRequirements } from '../checkers';

const accountRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Mathematical and Programming Courses',
    description:
      'Intro-level math and programming courses. Must be taken in your first two years of the business curriculum',
    source: 'https://fisher.osu.edu/undergraduate/academics/degree-requirements',
    checker: includesWithSubRequirements(
      ['MATH 1131', 'MATH 1151', 'MATH 1181H'],
      ['STAT 1430.01', 'STAT 1430H'],
      ['CSE 2111']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1],
    slotNames: ['Calculus I', 'Statistics', 'Excel'],
  },
  {
    name: 'Business Foundations',
    description: 'Intro-level business courses to be taken in the first two years of the business curriculum',
    source: 'https://fisher.osu.edu/undergraduate/academics/degree-requirements',
    checker: includesWithSubRequirements(['ECON 2001.01', 'ECON 2001.03H'], ['ECON 2002.01', 'ECON 2002.03H']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['Microeconomics', 'Macroeconomics'],
  },
  {
    name: 'Business Core',
    description:
      'All business students are required to complete a series of business core courses, regardless of specialization. Business core courses include managerial and financial accounting, finance, marketing, operations management, logistics management, organizational behavior, international business, business law, business statistics, business analytics, applied business skills, and strategic management.',
    source:
      'https://files.fisher.osu.edu/undergraduate/public/2021-07/ACCT.pdf?VersionId=fP8t35eUFNh3AXEZ1fY7sOsO.B6RWBSs',
    checker: includesWithSubRequirements(
      ['ACCTMIS 2200', 'ACCTMIS 2200H'],
      ['ACCTMIS 2300', 'ACCTMIS 2300H'],
      ['BUSOBA 2320', 'BUSOBA 2320H'],
      ['BUSOBA 2321'],
      ['BUSMHR 2292', 'BUSMHR 2292H'],
      ['BUSMHR 2000'],
      ['BUSFIN 3500'],
      ['BUSML 3380'],
      ['BUSFIN 3220'],
      ['BUSOBA 3230'],
      ['BUSML 3250'],
      ['BUSMHR 3200', 'BUSMHR 3200H'],
      ['BUSMHR 4490']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    slotNames: [
      'Accounting I',
      'Accounting II',
      'Decision Sciences',
      'Business Analytics',
      'Business Skills & Environment',
      'International Business',
      'Legal Environment of Business',
      'Logistics Management',
      'Business Finance',
      'Operations Management',
      'Marketing Management',
      'Organizational Behavior',
      'Strategic Management',
    ],
  },
  {
    name: 'Accounting Specialization',
    description: 'Intro-level business courses to be taken in the first two years of the business curriculum',
    source: 'https://fisher.osu.edu/undergraduate/academics/degree-requirements',
    checker: includesWithSubRequirements(
      ['BUSFIN 4510'],
      ['ACCTMIS 3200', 'ACCTMIS 3200H'],
      ['ACCTMIS 3201', 'ACCTMIS 3201H'],
      ['ACCTMIS 3300', 'ACCTMIS 3300H'],
      ['ACCTMIS 3400', 'ACCTMIS 3400H'],
      ['ACCTMIS 3600', 'ACCTMIS 3600H'],
      ['ACCTMIS 4200'],
      ['ACCTMIS 4500']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1, 1, 1, 1, 1, 1],
    slotNames: [
      'Legal Business Issues',
      'Financial Accounting I',
      'Financial Accounting II',
      'Cost Accounting',
      'Tax Accounting I',
      'Accounting Information Systems',
      'Advanced Financial Accounting',
      'Auditing Principles',
    ],
  },
  {
    name: 'Electives',
    description: 'Select one elective course from the following',
    source:
      'https://files.fisher.osu.edu/undergraduate/public/2021-07/ACCT.pdf?VersionId=fP8t35eUFNh3AXEZ1fY7sOsO.B6RWBSs',
    checker: includesWithSingleRequirement(
      'ACCTMIS 4210',
      'ACCTMIS 4220',
      'ACCTMIS 4310',
      'ACCTMIS 4410',
      'ACCTMIS 4510',
      'ACCTMIS 4784',
      'ACCTMIS 4780',
      'ACCTMIS 4780H'
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Course'],
  },
];

export default accountRequirements;
