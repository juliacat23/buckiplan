import { CollegeOrMajorRequirement, Course } from '@/requirements/types';
import { ifCodeMatch, includesWithSingleRequirement, includesWithSubRequirements } from '../checkers';

const cseRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Major Admission Requirements',
    description: 'Courses to be completed before applying to the CSE Major',
    source:
      'https://cse.osu.edu/current-students/undergraduate/majors/bachelors-science-computer-science-engineering-bs-cse',
    checker: includesWithSubRequirements(
      ['ENGR 1181.01', 'ENGR 1181.02', 'ENGR 1281.01H', 'ENGR 1281.02H', 'ENGR 1281.03H'],
      ['ENGR 1182.01', 'ENGR 1182.02', 'ENGR 1282.02H', 'ENGR 1282.02H', 'ENGR 1282.03H'],
      ['MATH 1151', 'MATH 1161.01', 'MATH 1161.02', 'MATH 1181H'],
      ['MATH 1172', 'MATH 2162.01', 'MATH 2162.02', '2182H'],
      ['PHYSICS 1250', 'PHYSICS 1250H', 'PHYSICS 1260'],
      ['CSE 2221']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1, 1, 1, 1],
    slotNames: [
      'FE/FEH 1',
      'FE/FEH 2',
      'Calculus I',
      'Calculus 2',
      'Mechanics, Work and Energy, Thermal Physics',
      'Software I: Software Components',
    ],
  },
  {
    name: 'Computer Science Core',
    description:
      'Intro-level math and programming courses. Must be taken in your first two years of the business curriculum',
    source:
      'https://cse.osu.edu/current-students/undergraduate/majors/bachelors-science-computer-science-engineering-bs-cse',
    checker: includesWithSubRequirements(
      ['CSE 2231'],
      ['CSE 2321'],
      ['CSE 2331'],
      ['CSE 2421'],
      ['CSE 2431'],
      ['CSE 3341'],
      ['CSE 2501', 'PHILOS 1338']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1, 1, 1, 1, 1],
    slotNames: [
      'Software II: Software Development & Design',
      'Foundations I: Discrete Structures',
      'Foundations II: Data Structures & Algorithms',
      'Systems I: Low-Level Programing',
      'Systems II: Operating Systems',
      'Computing Ethics (choose 1)',
    ],
  },
  {
    name: 'Non-Computer Science Core',
    description: 'Select at least 3 of the following courses',
    source:
      'https://cse.osu.edu/current-students/undergraduate/majors/bachelors-science-computer-science-engineering-bs-cse',
    checker: includesWithSubRequirements(
      ['ECE 2020'],
      ['ECE 2060'],
      ['MATH 2568', 'MATH 2568H'],
      ['MATH 3345', 'MATH 3345H'],
      ['STAT 3470']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 1, 1, 1],
    slotNames: [
      'Anaog Systems',
      'Digital Logic',
      'Linear Algebra',
      'Foundations of Higher Mathematics',
      'Statistics for Engineers',
    ],
  },
  {
    name: 'Math and Science Electives',
    description: 'Complete at least 8 credit hours',
    source:
      'https://cse.osu.edu/current-students/undergraduate/majors/bachelors-science-computer-science-engineering-bs-cse',
    checker: includesWithSingleRequirement(
      'MATH 2153',
      'MATH 2255',
      'MATH 2415',
      'HCS 2201',
      'HCS 2202',
      'STAT 4201',
      'STAT 5301',
      'ANTHROP 2200',
      'BIOLOGY 1113.01',
      'BIOLOGY 1114.01',
      'EARTHSC 1122',
      'CHEM 1210',
      'CHEM 1220',
      'EARTHSC 1121',
      'ENR 2000',
      'ENR 3000',
      'ENR 3001',
      'FDSCTE 2200',
      'PHYSICS 1251'
    ),
    fulfilledBy: 'credits',
    perSlotMinCount: [8],
  },
  {
    name: 'Technical Electives',
    description:
      'Choose 17 credit hours of coursework that meets the following criteria:' +
      '\n' +
      '\n' +
      '1. Any CSE course 3000-level or above not already used to fulfill another requirement' +
      '\n' +
      '\n' +
      '2. At most 2 credit hours of CSE 4251-4256' +
      '\n' +
      '\n' +
      '3. At most 2 hours of CSE 4193(H), 3 hours of 4998(H), or 6 hours of 4999(H) AND no more than 6 hours total of 4193/4998/4999 combined' +
      '\n' +
      '\n' +
      '4. At most 8 hours of non-CSE courses at the 2000-level and above approved by the academic advisor',
    source:
      'https://cse.osu.edu/current-students/undergraduate/majors/bachelors-science-computer-science-engineering-bs-cse',
    checker: [
      (course: Course): boolean => {
        const { catalogNbr } = course;
        return !(ifCodeMatch(catalogNbr, '1***') || ifCodeMatch(catalogNbr, '2***'));
      },
    ],
    fulfilledBy: 'credits',
    checkerWarning: 'We do not check that the courses fulfil the criteria for Technical Electives',
    perSlotMinCount: [17],
  },
  {
    name: 'Concentration',
    description:
      'Students must select and complete one of the following specialized options. The courses listed below may dictate CSE core choices and technical elective choices.',
    source:
      'https://cse.osu.edu/sites/default/files/uploads/purple_bs_cis_and_cse_specialization_options_au18_forward_rev_022219_purple.pdf',
    fulfilledBy: 'toggleable',
    fulfillmentOptions: {
      'Artifical Intelligence': {
        description:
          'Required Courses: CSE 3521 and CSE 5522 \n \nChoose one from CSE 5523, CSE 5524, CSE 5525, CSE 5526',
        checker: includesWithSubRequirements(
          ['CSE 3521'],
          ['CSE 5522'],
          ['CSE 5523', 'CSE 5524', 'CSE 5525', 'CSE 5526']
        ),
        counting: 'courses',
        perSlotMinCount: [1, 1, 1],
        slotNames: [
          'Survey of Artificial Intelligence I: Basic Techniques',
          'Survey of Artificial Intelligence II: Advanced Techniques',
          'Elective',
        ],
      },
      'Computer Graphics and Game Design': {
        description:
          'Required Courses: CSE 3541 and CSE 3902 ' +
          '\n' +
          '\n' +
          'Choose one from CSE 5542, CSE 5543, CSE 5544, CSE 5545, CSE 5912, CSE 5913',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['CSE 3541'],
          ['CSE 3902'],
          ['CSE 5542', 'CSE 5543', 'CSE 5544', 'CSE 5912', 'CSE 5913']
        ),
        perSlotMinCount: [1, 1, 1],
        slotNames: [
          'Computer Game and Animation Techniques',
          'Project: Design, Development, and Documentation of Interactive Systems',
          'Elective',
        ],
      },
      'Database Systems and Data Analytics': {
        description: 'Required Courses: CSE 3241 and CSE 5242 ' + '\n' + '\n' + 'Choose one from CSE 5243, CSE 5523',
        counting: 'courses',
        checker: includesWithSubRequirements(['CSE 3241'], ['CSE 5242'], ['CSE 5243', 'CSE 5523']),
        perSlotMinCount: [1, 1, 1],
        slotNames: ['Introduction to Database Systems', 'Advanced Database Management Systems', 'Elective'],
      },
      'Information and Computation Assurance': {
        description:
          'Required Courses: CSE 3461 and CSE 4471 ' +
          '\n' +
          '\n' +
          'Choose one from CSE 5472, CSE 5573' +
          '\n' +
          '\n' +
          'Additional Recommended Courses: CSE 3901, 5351, 5432; relevant courses in business, economics or law',
        counting: 'courses',
        checker: includesWithSubRequirements(['CSE 3461'], ['CSE 4471'], ['CSE 5472', 'CSE 5473']),
        perSlotMinCount: [1, 1, 1],
        slotNames: ['Computer Networking and Internet Technologies', 'Information Security', 'Elective'],
      },
      'Computer Networking': {
        description:
          'Required Course: CSE 3461' +
          '\n' +
          '\n' +
          'Choose two from CSE 5432, CSE 5462, CSE 5463, CSE 5472, CSE 5473' +
          '\n' +
          '\n' +
          'Additional Recommended Courses: CSE 3901, 5351',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['CSE 3461'],
          ['CSE 5432', 'CSE 5462', 'CSE 5463', 'CSE 5472', 'CSE 5473']
        ),
        perSlotMinCount: [1, 2],
        slotNames: ['Computer Networking and Internet Technologies', 'Elective'],
      },
      'Computer Systems': {
        description:
          'Required Course: CSE 3421' +
          '\n' +
          '\n' +
          'Choose one from CSE 5433, CSE 5462, CSE 5441' +
          '\n' +
          '\n' +
          'Choose one from CSE 5433, CSE 5441, CSE 3461, CSE 5243' +
          '\n' +
          '\n' +
          'Additional Recommended Courses: CSE 5434, 6421*, 6431*, 6441*' +
          '\n' +
          '\n' +
          '*Courses only available by petition',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['CSE 3421'],
          ['CSE 5433', 'CSE 5462', 'CSE 5441'],
          ['CSE 5433', 'CSE 5441', 'CSE 3461', 'CSE 5243']
        ),
        perSlotMinCount: [1, 1, 1],
        slotNames: ['Introduction to Computer Architecture', 'Group A', 'Group B'],
      },
      'Software Engineering': {
        description:
          'Required Courses: CSE 3231 and CSE 3232 ' +
          '\n' +
          '\n' +
          'Choose one from CSE 3321, CSE 5234, CSE 5235, CSE 5236',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['CSE 3231'],
          ['CSE 3232'],
          ['CSE 3321', 'CSE 5234', 'CSE 5235', 'CSE 5236']
        ),
        perSlotMinCount: [1, 1, 1],
        slotNames: ['Software Engineering Techniques', 'Software Requirements Analysis', 'Elective'],
      },
      'Individualized Option': {
        description:
          'Students should consult with their faculty advisors to identify the most reasonable set of courses that would be appropriate, given their specific interests.',
        counting: 'courses',
        checker: [(course: Course): boolean => course.subject === 'CSE'],
        perSlotMinCount: [3],
        slotNames: ['Course'],
      },
    },
  },
];

export default cseRequirements;
