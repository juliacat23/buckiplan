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
      'ANTHROP 2200',
      'BIOLOGY 1113',
      'BIOLOGY 1114',
      'CHEM 1210',
      'CHEM 1220',
      'EARTHSC 1121',
      'EARTHSC 1122',
      'ENR 2000',
      'ENR 3000',
      'ENR 3001',
      'FDSCTE 2200',
      'HSC 2201',
      'HSC 2202',
      'PHYSICS 1251'
    ),
    fulfilledBy: 'credits',
    perSlotMinCount: [8],
  },
  {
    name: 'Technical Electives',
    description:
      'Choose 17 credit hours of coursework that meets the following criteria:' +
      '1. Any CSE course 3000-level or above not already used to fulfill another requirement' +
      '2. At most 2 credit hours of CSE 4251-4256' +
      '3. At most 2 hours of CSE 4193(H), 3 hours of 4998(H), or 6 hours of 4999(H) AND no more than 6 hours total of 4193/4998/4999 combined' +
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
    name: 'Name',
    description: 'Option 1: CHEM 2070 and CHEM 2080, Option 2: CHEM 2150',
    source: 'https://chemistry.cornell.edu/required-core-courses',
    fulfilledBy: 'toggleable',
    fulfillmentOptions: {
      'Artifical Intelligence': {
        description:
          'Required Courses: CSE 3521 and CSE 5522 \n A. Choose one from CSE 5523, CSE 5524, CSE 5525, CSE 5526',
        checker: includesWithSubRequirements(
          ['CSE 3521', 'CSE 5522'],
          ['CSE 5523', 'CSE 5524', 'CSE 5525', 'CSE 5526']
        ),
        counting: 'courses',
        perSlotMinCount: [2, 1],
        slotNames: ['Required Courses', 'Elective Courses'],
      },
      'Computer Graphics and Game Design': {
        description:
          'Required Courses: CSE 3541 and CSE 3902 ' +
          'A. Choose one from CSE 5542, CSE 5543, CSE 5544, CSE 5545, CSE 5912, CSE 5913',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['CSE 3541', 'CSE 3902'],
          ['CSE 5542', 'CSE 5543', 'CSE 5544', 'CSE 5545', 'CSE 5912', 'CSE 5913']
        ),
        perSlotMinCount: [2, 1],
        slotNames: ['Required Courses', 'Elective Courses'],
      },
      'Database Systems and Data Analytics': {
        description: 'Required Courses: CSE 3241 and CSE 5242 ' + 'A. Choose one from CSE 5243, CSE 5523',
        counting: 'courses',
        checker: includesWithSubRequirements(['CSE 3241', 'CSE 5242'], ['CSE 5243', 'CSE 5523']),
        perSlotMinCount: [2, 1],
        slotNames: ['Required Courses', 'Elective Courses'],
      },
      'Information and Computation Assurance': {
        description:
          'Required Courses: CSE 3461 and CSE 4471 ' +
          'A. Choose one from CSE 5472, CSE 5573' +
          'B. Additional Recommended Courses: CSE 3901, 5351, 5432; relevant courses in business, economics or law',
        counting: 'courses',
        checker: includesWithSubRequirements(['CSE 3461', 'CSE 4471'], ['CSE 5472', 'CSE 5473']),
        perSlotMinCount: [2, 1],
        slotNames: ['Required Courses', 'Elective Courses'],
      },
      'Computer Networking': {
        description:
          'Required Course: CSE 3461 ' +
          'A. Choose two from CSE 5432, CSE 5462, CSE 5463, CSE 5472, CSE 5473' +
          'B. Additional Recommended Courses: CSE 3901, 5351',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['CSE 3461'],
          ['CSE 5532', 'CSE 5462', 'CSE 5462', 'CSE 5472', 'CSE 5473']
        ),
        perSlotMinCount: [1, 2],
        slotNames: ['Required Courses', 'Elective Courses'],
      },
      'Computer Systems': {
        description:
          'Required Course: CSE 3421 ' +
          'A. Choose one from CSE 5433, CSE 5462, CSE 5441' +
          'B. Choose one from CSE 5433, CSE 5441, CSE 3461, CSE 5243' +
          'C. Additional Recommended Courses: CSE 5434, 6421*, 6431*, 6441*' +
          '*Courses only available by petition',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['CSE 3421'],
          ['CSE 5433', 'CSE 5462', 'CSE 5441'],
          ['CSE 5433', 'CSE 5441', 'CSE 3461', 'CSE 5243']
        ),
        perSlotMinCount: [1, 1, 1],
        slotNames: ['Required Courses', 'Group A', 'Group B'],
      },
      'Software Engineering': {
        description:
          'Required Courses: CSE 3231 and CSE 3232 ' + 'A. Choose one from CSE 3321, CSE 5234, CSE 5235, CSE 5236',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['CSE 3231', 'CSE 3232'],
          ['CSE 3321', 'CSE 5234', 'CSE 5235', 'CSE 5236']
        ),
        perSlotMinCount: [2, 1],
        slotNames: ['Required Courses', 'Elective Courses'],
      },
      'Individualized Option': {
        description:
          'Students should consult with their faculty advisors to identify the most reasonable set of courses that would be appropriate, given their specific interests.',
        counting: 'courses',
        checker: [(course: Course): boolean => course.subject === 'CSE'],
        perSlotMinCount: [3],
        slotNames: ['Individualized Course Option'],
      },
    },
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

export default cseRequirements;
