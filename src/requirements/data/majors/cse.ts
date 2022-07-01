import { CollegeOrMajorRequirement } from '@/requirements/types';
import { includesWithSingleRequirement, includesWithSubRequirements } from '../checkers';

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
    name: 'Specialization',
    description:
      'Select and choose one of the following specialization options: Artifical Intelligence, Computer Graphics and Game Design, Database Systems and Data Analytics, Information and Computation Assurance, Computer Networking, Computer Systems, Software Engineering, Individualized Option',
    source:
      'https://cse.osu.edu/sites/default/files/uploads/purple_bs_cis_and_cse_specialization_options_au18_forward_rev_022219_purple.pdf',
    fulfilledBy: 'toggleable',
    fulfillmentOptions: {
      'Artifical Intelligence': {
        description:
          'Complete the required courses of CSE 3521 and CSE 5522. Choose one course to complete from the remaining options',
        counting: 'credits',
        checker: includesWithSubRequirements(
          ['CSE 3521'],
          ['CSE 5522'],
          ['CSE 5523', 'CSE 5524', 'CSE 5525', 'CSE 5526']
        ),
        perSlotMinCount: [3, 3, 3],
      },
      'Computer Graphics and Game Design': {
        description:
          'Complete the required courses of CSE 3541 and CSE 3902. Choose one course to complete from the remaining options',
        counting: 'credits',
        checker: includesWithSubRequirements(
          ['CSE 3541'],
          ['CSE 3902'],
          ['CSE 5523', 'CSE 5524', 'CSE 5525', 'CSE 5526']
        ),
        perSlotMinCount: [3, 3, 3],
      },
      'Business Analytics': {
        description:
          'Complete coursework in economics and business analytics. Students must complete at least 9 credits of elective courses from the list below.',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['ECON 2001.01', 'ECON 2001.02', 'ECON 2001.03'],
          ['ECON 2002.01', 'ECON 2002.02', 'ECON 2002.03'],
          ['BUSADM 3630.05'],
          ['BUSADM 3632.05'],
          ['PUBHLTH 5015'],
          [
            'BUSFIN 3210',
            'BUSFIN 3220',
            'BUSFIN 3222',
            'BUSFIN 3250',
            'BUSFIN 4201',
            'ACCTMIS 2000',
            'ACCTMIS 3600',
            'ACTMIS 4210',
            'ACCTMIS 4310',
            'ACCTMIS 4650',
            'ACCTMIS 5000',
            'BUSMI 3150',
            'BUSML 3250',
            'BUSML 4202',
            'BUSML 4210',
            'BUSML 4211',
            'BUSML 4212',
            'BUSOBA 3230',
            'BUSOBA 4250',
            'BUSOBA 4251',
            'BUSML 3380',
            'BUSML 4382',
            'BUSML 4386',
          ]
        ),
        perSlotMinCount: [1, 1, 1, 1, 3],
        slotNames: ['Microeconomics', 'Macroeconomics', '"Big Data"', 'Designing Business Solutions', 'Electives'],
      },
      'Computational Analytics': {
        description:
          'Students in the Computational Analytics specialization must take 10 credit hours of coursework from the electives listed below',
        counting: 'credits',
        checker: includesWithSingleRequirement(
          'CSE 3461',
          'CSE 4471',
          'CSE 5472',
          'CSE 5473',
          'CSE 2331',
          'CSE 3521',
          'CSE 5245',
          'CSE 5523',
          'CSE 5524',
          'CSE 5526',
          'CSE 2331',
          'CSE 2431',
          'CSE 3901',
          'CSE 3902',
          'CSE 3903',
          'CSE 5245',
          'CSE 5361',
          'CSE 5441',
          'LING 5801',
          'LING 5802',
          'CSE 5525',
          'LING 4100',
          'LING 4200',
          'LING 4300',
          'LING 4400'
        ),
        perSlotMinCount: [10],
      },
      'Data Visualization': {
        description:
          'All students specializing in Data Visualization must complete the following courses. ISE 5760 must be taken as a core requirement',
        counting: 'courses',
        checker: includesWithSubRequirements(['DESIGN 5505'], ['CSE 5544'], ['ACCAD 5141'], ['ACCAD 5150']),
        perSlotMinCount: [1, 1, 1, 1],
        slotNames: ['Information Design', 'Intro to Data Vis', 'Interactive Arts', 'Trends in Data Vis'],
      },
      'Social Science Analytics': {
        description:
          'Students are required to complete 1 Overview of Research Methods course, 3 elective courses, and independent research in the social sciences',
        counting: 'courses',
        checker: includesWithSubRequirements(
          ['COMM 3160', 'POLITSC 4781', 'PYSCH 2300', 'SOCIOL 3487'],
          [
            'ANTHROP 4998',
            'ANTHROP 4999',
            'ASAMSTS 4998',
            'ASAMSTS 4999',
            'ARTSSCI 4998',
            'ARTSSCI 4999',
            'ATMOSSC 4998',
            'ATMOSSC 4999',
            'COMM 4998',
            'COMM 4999',
          ],
          [
            'ANTHRO 5650',
            'ANTHRO 5651',
            'COMM 3163',
            'ECON 4050',
            'ECON 5420',
            'GEOG 5200',
            'GEOG 5201',
            'GEOG 5210',
            'GEOG 5222',
            'GEOG 5223',
            'GEOG 5225',
            'GEOG 5226',
            'POLITSC 3780',
            'PSYCH 4511',
            'SOCIOL 4650',
          ]
        ),
        perSlotMinCount: [1, 1, 3],
        slotNames: ['Research Methods', 'Independent Research', 'Electives'],
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
