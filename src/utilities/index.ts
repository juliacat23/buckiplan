import { coursesColorSet } from '@/constants/colors';
import { fullCoursesArray } from '@/constants/courses/typed-full-courses';
import RequirementJson from '@/requirements/typedRequirementJson';

export function checkNotNull<T>(value: T | null | undefined): T {
  if (value == null) throw new Error();
  return value;
}

/** Retrieve a list of all subjects from the course data */
function getAllSubjects(): ReadonlySet<string> {
  const set = new Set<string>();
  fullCoursesArray.forEach((it) => set.add(it.subject));
  return set;
}

/** Map the list of colors defined in '@constants/colors' to the subjects
 * retrieved in the getAllSubjects() function above
 */

export function allocateAllSubjectColor(subjectColors: Record<string, string>): Record<string, string> {
  const subjectsColorsCopy = { ...subjectColors };
  getAllSubjects().forEach((subject) => {
    if (subjectsColorsCopy[subject]) return;
    subjectsColorsCopy[subject] = coursesColorSet[Math.floor(Math.random() * coursesColorSet.length)].hex.substring(1);
  });
  return subjectsColorsCopy;
}

/** Allow user to manually update the subject or course color */
export function updateSubjectColor(
  subjectColors: Record<string, string>,
  color: string,
  code: string
): Record<string, string> {
  const subjectsColorsCopy = { ...subjectColors };
  getAllSubjects().forEach((subject) => {
    if (subject === code) {
      subjectsColorsCopy[subject] = color;
    }
  });
  return subjectsColorsCopy;
}

/** Allows for there to be two GE requirements for each college
 * pre-fall 2022 (legacy GE) and fall 2022 - forward (new GE)
 */
export function getCollegeFullName(acronym: string | undefined): string {
  if (acronym && acronym.startsWith('ARCH')) {
    return 'Architecture';
  }
  if (acronym && acronym.startsWith('ASC')) {
    return 'Arts and Sciences';
  }
  if (acronym && acronym.startsWith('BUS')) {
    return 'Fisher College of Business';
  }
  if (acronym && acronym.startsWith('DENT')) {
    return 'Dentistry';
  }
  if (acronym && acronym.startsWith('EHE')) {
    return 'Education and Human Ecology';
  }
  if (acronym && acronym.startsWith('ENG')) {
    return 'Engineering';
  }
  if (acronym && acronym.startsWith('ENR')) {
    return 'Environment and Natural Resources';
  }
  if (acronym && acronym.startsWith('FAES')) {
    return 'Food, Agricultural and Environmental Sciences';
  }
  if (acronym && acronym.startsWith('HRS')) {
    return 'Health and Rehabilitation Sciences';
  }
  if (acronym && acronym.startsWith('MED')) {
    return 'Medicine';
  }
  if (acronym && acronym.startsWith('NUR')) {
    return 'Nursing';
  }
  if (acronym && acronym.startsWith('PHR')) {
    return 'Pharmacy';
  }
  if (acronym && acronym.startsWith('PBAF')) {
    return 'John Glenn College of Public Affairs';
  }
  if (acronym && acronym.startsWith('PUBH')) {
    return 'Public Health';
  }
  if (acronym && acronym.startsWith('SWK')) {
    return 'Social Work';
  }
  const college = acronym ? RequirementJson.college[acronym] : null;

  // Return empty string if college is not in requirementJSON
  return college ? college.name : '';
}

export function getMajorFullName(acronym: string): string {
  const major = RequirementJson.major[acronym];
  return major ? major.name : '';
}

export function getMinorFullName(acronym: string): string {
  const minor = RequirementJson.minor[acronym];
  return minor ? minor.name : '';
}

export function getPreProgramFullName(acronym: string): string {
  const preProgram = RequirementJson.preProgram[acronym];
  return preProgram ? preProgram.name : '';
}

// Determines whether the given element in a FirestoreSemester list is a Placeholder or not
export const isPlaceholderCourse = (
  element: FirestoreSemesterPlaceholder | FirestoreSemesterCourse | CourseTaken
): element is FirestoreSemesterPlaceholder => !!(element as FirestoreSemesterPlaceholder).startingSemester;

export const clickOutside = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  beforeMount(el: any, binding: any): void {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unmounted(el: any): void {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
};

// Determines whether the given element used in CourseCaution is CourseTaken
export const isCourseTaken = (
  element: FirestoreSemesterPlaceholder | FirestoreSemesterCourse | CourseTaken
): element is CourseTaken => !!(element as CourseTaken).uniqueId;

export const SeasonOrdinal = {
  Spring: 0,
  Summer: 1,
  Fall: 2,
} as const;

export const sortedSemesters = (
  semesters: readonly FirestoreSemester[],
  orderByNewest = true
): readonly FirestoreSemester[] =>
  semesters.slice().sort((a, b) => {
    // sort in increasing order iff orderByNewest is false, increasing otherwise
    const order = orderByNewest ? -1 : 1;
    const byYear = a.year - b.year;
    return order * (byYear === 0 ? SeasonOrdinal[a.season] - SeasonOrdinal[b.season] : byYear);
  });

export function getCurrentSeason(): FirestoreSemesterSeason {
  const currentMonth = new Date().getMonth();
  if (currentMonth <= 4) return 'Spring';
  if (currentMonth <= 7) return 'Summer';
  return 'Fall';
}

const reqGroupColorList = ['4D7D92', '148481', '105351'];

export function getReqColor(groupName: string, onboardingData: AppOnboardingData): string {
  // college will always be the first color
  if (groupName === 'College') {
    return reqGroupColorList[0];
  }
  // if the user has major(s), it must be the second group in the requirements bar
  if (groupName === 'Major') {
    return reqGroupColorList[1];
  }
  // if the user has minors, use the second color if the majors section does not display, otherwise use the third color
  if (groupName === 'Minor') {
    if (onboardingData.major.length === 0) {
      return reqGroupColorList[1];
    }
    return reqGroupColorList[2];
  }
  // if the user has a grad program, display the first color if no college present, second color if no majors and minors,
  // the third color if one of them, or wrap around if all are present
  if (!onboardingData.college) {
    return reqGroupColorList[0];
  }
  if (onboardingData.major.length === 0 && onboardingData.minor.length === 0) {
    return reqGroupColorList[1];
  }
  if (onboardingData.minor.length === 0 || onboardingData.major.length === 0) {
    return reqGroupColorList[2];
  }
  return reqGroupColorList[0];
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
