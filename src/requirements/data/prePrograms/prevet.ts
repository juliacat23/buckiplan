import { Course, CollegeOrMajorRequirement } from '@/requirements/types';
import { ifCodeMatch, includesWithSubRequirements, courseIsSURV, courseIsForeignLang } from '../checkers';

const preventRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'Biochemistry',
    description: 'Introductory Biochemistry without lab',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(['BIOCHEM 4511']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Introduction to Biochemistry'],
  },
  {
    name: 'Microbiology',
    description: 'Basic & Practical Microbiology course for health professionals',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(['MICROBIO 4000.01', 'MICRBIO 4000.02']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Practical Microbiology'],
  },
  {
    name: 'Physiology',
    description: 'One semester Physiology course; can be focused on animal or human physiology',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(['ANIMSCI 3200', 'PHYSIO 3200']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Physiology'],
  },
  {
    name: 'Communications',
    description: 'Complete one class focused on communications from below',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: includesWithSubRequirements(['COMM 2110', 'COMM 2131', 'AGRCOMM 3130']),
    fulfilledBy: 'courses',
    perSlotMinCount: [1],
    slotNames: ['Communication'],
  },
  {
    name: 'Science electives',
    description:
      'Complete 35 hours of science credits (includes, but not limited to: biology, chemistry, anatomy, immunology, cell biology, molecular genetics, animal science, ecology, environmental science or other science courses.)',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
    checker: [
      (course: Course): boolean => {
        const { subject } = course;
        return (
          (!courseIsSURV && ifCodeMatch(subject, 'ANIMSCI')) ||
          ifCodeMatch(subject, 'BIOLOGY') ||
          ifCodeMatch(subject, 'CHEMISTRY') ||
          ifCodeMatch(subject, 'ANATOMY') ||
          ifCodeMatch(subject, 'BIOPHRM') ||
          ifCodeMatch(subject, 'CBG') ||
          ifCodeMatch(subject, 'CBE') ||
          ifCodeMatch(subject, 'BME') ||
          ifCodeMatch(subject, 'FABENG') ||
          ifCodeMatch(subject, 'HUMNNTR') ||
          ifCodeMatch(subject, 'FAES') ||
          ifCodeMatch(subject, 'MEDLBS') ||
          ifCodeMatch(subject, 'MEDMCIM') ||
          ifCodeMatch(subject, 'MOLGEN') ||
          ifCodeMatch(subject, 'NEUROSC') ||
          ifCodeMatch(subject, 'VETPREV') ||
          ifCodeMatch(subject, 'VETCLIN') ||
          ifCodeMatch(subject, 'PLNTPTH') ||
          ifCodeMatch(subject, 'PHYSIO') ||
          ifCodeMatch(subject, 'PHR') ||
          ifCodeMatch(subject, 'MICRBIO ') ||
          (course.catalogSatisfiesReq?.includes('NS1') ?? false) ||
          (course.catalogSatisfiesReq?.includes('NS2') ?? false)
        );
      },
    ],
    fulfilledBy: 'credits',
    perSlotMinCount: [35],
  },
  {
    name: 'Humanities/Social Science electives',
    description:
      'Complete 16 hours of humanities or science science courses (Includes, but not limited to: history, economics, anthropology, psychology, art, music, literature, languages, writing, and ethics.)',
    source: 'https://preprofessional.osu.edu/prehealth/program-prerequisites',
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
          (course.catalogSatisfiesReq?.includes('AH4') ?? false) ||
          (course.catalogSatisfiesReq?.includes('SS1') ?? false) ||
          (course.catalogSatisfiesReq?.includes('SS2') ?? false) ||
          (course.catalogSatisfiesReq?.includes('SS3') ?? false) ||
          (course.catalogSatisfiesReq?.includes('ET1') ?? false)
        );
      },
    ],
    fulfilledBy: 'credits',
    perSlotMinCount: [16],
  },
];

export default preventRequirements;
