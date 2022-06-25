import type { TypedVuexStore } from './store';

const createCourseCreditRange = (course: OSUCourse): readonly [number, number] => {
  const courseCreditRange: number[] = [];
  course.enrollGroups.forEach((enrollGroup) => {
    courseCreditRange.push(enrollGroup.unitsMinimum);
    courseCreditRange.push(enrollGroup.unitsMaximum);
  });
  return [Math.min(...courseCreditRange), Math.max(...courseCreditRange)];
};

export const osuCourseToFirebaseSemesterCourseWithCustomIDAndColor = (
  course: OSUCourse,
  uniqueID: number,
  color: string
): FirestoreSemesterCourse => {
  const { subject, catalogNbr: number, titleLong: name } = course;
  const credits = course.enrollGroups[0].unitsMaximum;
  const creditRange = createCourseCreditRange(course);
  const alternateSemesters =
    !course.catalogWhenOffered || course.catalogWhenOffered === ''
      ? []
      : course.catalogWhenOffered.replace(/\./g, '').split(', ');
  const semesters = alternateSemesters;

  return {
    crseId: course.crseId,
    code: `${subject} ${number}`,
    name,
    credits,
    creditRange,
    semesters,
    color,
    uniqueID,
  };
};

export const osuCourseToFirebaseSemesterCourse = (
  course: OSUCourse,
  store: TypedVuexStore,
  incrementUniqueID: () => number
): FirestoreSemesterCourse =>
  osuCourseToFirebaseSemesterCourseWithCustomIDAndColor(
    course,
    incrementUniqueID(),
    store.state.subjectColors[course.subject]
  );

export const firestoreSemesterCourseToBottomBarCourse = ({
  code,
  name,
  credits,
  color,
  semesters,
  uniqueID,
}: FirestoreSemesterCourse): AppBottomBarCourse => ({
  code,
  name,
  credits,
  color,
  semesters,
  prereqs: '',
  description: '',
  uniqueID,
});

export const osuCourseDetailedInformationToPartialBottomCourseInformation = (
  course: OSUCourseFullDetail
): Pick<AppBottomBarCourse, 'description' | 'prereqs'> => {
  // Get prereqs of course as string (). '' if neither available because '' is interpreted as false
  const description = course.catalogDescription || '';
  const prereqs = course.catalogPreReqs || '';

  // Distribution of course (e.g. MQR-AS)
  // alternateDistributions option in case catalogDistr for the course is null, undef, ''

  return { description, prereqs };
};

// set entranceSem to fall and gradSem to spring by default locally, saved to Firestore when Onboarding finished
export const createAppOnboardingData = (data: FirestoreOnboardingUserData): AppOnboardingData => ({
  // TODO: take into account multiple colleges
  gradYear: data.gradYear ?? '',
  gradSem: data.gradSem ?? '',
  entranceYear: data.entranceYear ?? '',
  entranceSem: data.entranceSem ?? '',
  college: data.colleges.length !== 0 ? data.colleges[0].acronym : undefined,
  major: data.majors.map(({ acronym }) => acronym),
  minor: data.minors.map(({ acronym }) => acronym),
  preProgram: data.prePrograms.map(({ acronym }) => acronym),
  exam: 'exam' in data ? [...data.exam] : [],
});