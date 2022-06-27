import store from '@/store';
import { incrementUniqueID } from './utils';
import { osuCourseToFirebaseSemesterCourse } from '@/userDataConverter';

export const osuCourseToFirebaseSemesterCourseWithGlobalData = (course: OSUCourse): FirestoreSemesterCourse =>
  osuCourseToFirebaseSemesterCourse(course, store, incrementUniqueID);

export { incrementUniqueID };
export { setAppOnboardingData, deleteTransferCredit } from './onboardingData';
export { default as chooseToggleableRequirementOption } from './toggeableRequirementChoices';
export {
  updateRequirementChoice,
  toggleRequirementChoice,
  updateRequirementChoices,
  deleteCourseFromRequirementChoices,
} from './overrideFulfillment';
export {
  editSemester,
  editSemesters,
  addSemester,
  deleteSemester,
  addCourseToSemester,
  deleteCourseFromSemester,
  deleteAllCoursesFromSemester,
  deleteCourseFromSemesters,
  populateSemesters,
} from './semesters';

export { default as retrieveAnalytics } from './analytics';
