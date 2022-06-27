import { Course, CollegeOrMajorRequirement } from '@/requirements/types';
import { includesWithSubRequirements, ifCodeMatch, courseIsSURV, courseIsForeignLang } from '../checkers';

const premedRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'General Chemistry',
    description: 'Two-semester sequence of General Chemistry',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(
      ['CHEM 1210', 'CHEM 1610', 'CHEM 1910H'],
      ['CHEM 1220', 'CHEM 1620', 'CHEM 1920H']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['General Chemistry I', 'General Chemistry II'],
  },
  {
    name: 'Organic Chemistry',
    description: 'Two semester sequence of Organic Chemistry, with labs',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(
      ['CHEM 2510', 'CHEM 2610', 'CHEM 2910H'],
      ['CHEM 2520', 'CHEM 2620', 'CHEM 2920H'],
      ['CHEM 2540', 'CHEM 2550']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1, 2],
    slotNames: ['Organic Chemistry I', 'Organic Chemistry II', 'Labs'],
  },
  {
    name: 'Physics',
    description: 'Introductory two-semester Physics sequence',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(
      ['PHYSICS 1200', 'PHYSICS 1250', 'PHYSICS 1250H', 'PHYSICS 1260'],
      ['PHYSICS 1201', 'PHYSICS 1251', 'PHYSICS 1251H', 'PHYSICS 1261']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['Mechanics, Kinematics, Fluids, Waves', 'E&M, Optics, Modern Physics'],
  },
  {
    name: 'Biology',
    description: 'two-semester sequence of biology for science majors',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(
      ['BIOLOGY 1113', 'BIOLOGY 1113H', 'BIOLOGY 1113E', 'BIOLOGY 1113.02'],
      ['BIOLOGY 1114', 'BIOLOGY 1114H', 'BIOLOGY 1114E', 'BIOLOGY 1114.02']
    ),
    fulfilledBy: 'courses',
    perSlotMinCount: [1, 1],
    slotNames: ['Energy Transfer and Development', 'Form, Function, Diversity, and Ecology'],
  },
  {
    name: 'Biochemistry',
    description: 'Option 1: BIOCHEM 4511, Option 2: BIOCHEM 5613 + 5614',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    fulfilledBy: 'toggleable',
    fulfillmentOptions: {
      'Option 1': {
        description: 'BIOCHEM 4511',
        checker: includesWithSubRequirements(['BIOCHEM 4511']),
        counting: 'courses',
        perSlotMinCount: [1],
        slotNames: ['Introduction to Biochemistry'],
      },
      'Option 2': {
        description: 'BIOCHEM 5613 and BIOCHEM 5614',
        checker: includesWithSubRequirements(['BIOCHEM 5613'], ['BIOCHEM 5614']),
        counting: 'courses',
        perSlotMinCount: [1, 1],
        slotNames: ['Biochemistry and Molecular Biology I', 'Biochemistry and Molecular Biology II'],
      },
    },
  },
  {
    name: 'Recommended Coursework',
    description:
      'The following are optional courses recommended by OSU College of Medicine to bolster the strength of your application',
    source: 'https://medicine.osu.edu/education/md/admissions/before-you-apply/requirements',
    fulfilledBy: 'toggleable',
    fulfillmentOptions: {
      'Writing/Speech': {
        description:
          'Courses that emphasize written and verbal communication. Applicants are required to demonstrate spoken, auditory, reading and writing proficiency in the English language',
        counting: 'credits',
        checker: [
          (course: Course): boolean => {
            const { subject } = course;
            return (
              (!courseIsSURV && ifCodeMatch(subject, 'COMM')) || (course.catalogSatisfiesReq?.includes('WR2') ?? false)
            );
          },
        ],
        perSlotMinCount: [0],
      },
      'Social Sciences': {
        description: 'Courses such as psychology, sociology, anthropology and economics',
        counting: 'credits',
        checker: [
          (course: Course): boolean => {
            const { subject } = course;
            return (
              (!courseIsSURV && ifCodeMatch(subject, 'SOCIOL')) ||
              ifCodeMatch(subject, 'ECON') ||
              ifCodeMatch(subject, 'ANTHROP') ||
              ifCodeMatch(subject, 'PSYCH') ||
              ifCodeMatch(subject, 'POLITSC') ||
              (course.catalogSatisfiesReq?.includes('SS1') ?? false) ||
              (course.catalogSatisfiesReq?.includes('SS2') ?? false) ||
              (course.catalogSatisfiesReq?.includes('SS3') ?? false)
            );
          },
        ],
        perSlotMinCount: [0],
      },
      Humanities: {
        description: 'Courses in art, music, drama, literature and languages',
        counting: 'credits',
        checker: [
          (course: Course): boolean => {
            const { subject } = course;
            return (
              (!courseIsSURV && ifCodeMatch(subject, 'HISTORY')) ||
              ifCodeMatch(subject, 'ECON') ||
              ifCodeMatch(subject, 'ANTHROP') ||
              ifCodeMatch(subject, 'PSYCH') ||
              ifCodeMatch(subject, 'ART') ||
              ifCodeMatch(subject, 'HISTART') ||
              ifCodeMatch(subject, 'ARTEDUC') ||
              ifCodeMatch(subject, 'AFAMAST') ||
              ifCodeMatch(subject, 'ASAMSTS') ||
              ifCodeMatch(subject, 'CLAS') ||
              ifCodeMatch(subject, 'EALL') ||
              ifCodeMatch(subject, 'MUSIC') ||
              ifCodeMatch(subject, 'EEURLL') ||
              ifCodeMatch(subject, 'EHE') ||
              ifCodeMatch(subject, 'ENGLISH') ||
              ifCodeMatch(subject, 'FILMSTD') ||
              ifCodeMatch(subject, 'PHILOS') ||
              courseIsForeignLang(course) ||
              (course.catalogSatisfiesReq?.includes('AH1') ?? false) ||
              (course.catalogSatisfiesReq?.includes('AH2') ?? false) ||
              (course.catalogSatisfiesReq?.includes('AH3') ?? false) ||
              (course.catalogSatisfiesReq?.includes('AH4') ?? false)
            );
          },
        ],
        perSlotMinCount: [0],
      },
      Diversity: {
        description: 'Courses that focus on the culture, history and/or current circumstances of diverse populations',
        counting: 'credits',
        checker: [
          (course: Course): boolean => {
            return (
              (course.catalogSatisfiesReq?.includes('SD1') ?? false) ||
              (course.catalogSatisfiesReq?.includes('SD2') ?? false)
            );
          },
        ],
        perSlotMinCount: [0],
      },
      Ethics: {
        description:
          'Courses that address questions and issues related to morality and moral behavior that may include meta-ethics, normative ethics, applied ethics, moral psychology and descriptive ethics',
        counting: 'credits',
        checker: [
          (course: Course): boolean => {
            return course.catalogSatisfiesReq?.includes('ET1') ?? false;
          },
        ],
        perSlotMinCount: [0],
      },
    },
  },
];

export default premedRequirements;
