import { reactive } from 'vue';
import { GTag, GTagEvent } from '../../gtag';
import { checkNotNull } from '../../utilities';

import {
  osuCourseDetailedInformationToPartialBottomCourseInformation,
  firestoreSemesterCourseToBottomBarCourse,
} from '../../userDataConverter';

export type BottomBarState = {
  bottomCourses: readonly AppBottomBarCourse[];
  bottomCourseFocus: number;
  isExpanded: boolean;
};

const vueForBottomBar = reactive({
  bottomCourses: [] as AppBottomBarCourse[],
  bottomCourseFocus: 0,
  isExpanded: false,
});

export const immutableBottomBarState: Readonly<BottomBarState> = vueForBottomBar;

export const reportCourseColorChange = (courseUniqueID: number, color: string): void => {
  vueForBottomBar.bottomCourses = vueForBottomBar.bottomCourses.map((course) =>
    course.uniqueID === courseUniqueID ? { ...course, color } : course
  );
};

export const reportSubjectColorChange = (code: string, color: string): void => {
  vueForBottomBar.bottomCourses = vueForBottomBar.bottomCourses.map((course) =>
    course.code.split(' ')[0] === code.split(' ')[0] ? { ...course, color } : course
  );
};

const getReviews = (
  subject: string,
  number: string
): Promise<{
  classRating: number;
  classDifficulty: number;
  classWorkload: number;
}> =>
  fetch('https://www.cureviews.org/v2/getCourseByInfo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject: subject.toLowerCase(), number }),
  }).then(
    (res) =>
      (res.ok && res.json().then((reviews) => reviews.result)) || {
        classRating: null,
        classDifficulty: null,
        classWorkload: null,
      }
  );

export const addCourseToBottomBar = (course: FirestoreSemesterCourse): void => {
  vueForBottomBar.isExpanded = true;

  for (let i = 0; i < vueForBottomBar.bottomCourses.length; i += 1) {
    const existingCourse = vueForBottomBar.bottomCourses[i];
    // Must check both uniqueID and code (e.g. CS 1110) to handle req courses that share uniqueID -1
    if (existingCourse.uniqueID === course.uniqueID && existingCourse.code === course.code) {
      vueForBottomBar.bottomCourseFocus = i;
      return;
    }
  }

  vueForBottomBar.bottomCourses = [firestoreSemesterCourseToBottomBarCourse(course), ...vueForBottomBar.bottomCourses];
  vueForBottomBar.bottomCourseFocus = 0;
};

export const toggleBottomBar = (gtag?: GTag): void => {
  vueForBottomBar.isExpanded = !vueForBottomBar.isExpanded;
  if (vueForBottomBar.isExpanded) {
    GTagEvent(gtag, 'bottom-bar-open');
  } else {
    GTagEvent(gtag, 'bottom-bar-close');
  }
};

export const closeBottomBar = (gtag?: GTag): void => {
  vueForBottomBar.isExpanded = false;
  GTagEvent(gtag, 'bottom-bar-close');
};

export const changeBottomBarCourseFocus = (index: number): void => {
  vueForBottomBar.bottomCourseFocus = index;
};

export const deleteBottomBarCourse = (index: number, gtag?: GTag): void => {
  GTagEvent(gtag, 'bottom-bar-delete-tab');
  vueForBottomBar.bottomCourses = vueForBottomBar.bottomCourses.filter((_, i) => i !== index);
  if (vueForBottomBar.bottomCourseFocus >= vueForBottomBar.bottomCourses.length) {
    vueForBottomBar.bottomCourseFocus = vueForBottomBar.bottomCourses.length - 1;
  }
};

export const moveBottomBarCourseToFirst = (index: number): void => {
  vueForBottomBar.isExpanded = true;
  const courseToMove = vueForBottomBar.bottomCourses[index];
  vueForBottomBar.bottomCourses = [
    courseToMove,
    ...vueForBottomBar.bottomCourses.slice(0, index),
    ...vueForBottomBar.bottomCourses.slice(index + 1),
  ];
  vueForBottomBar.bottomCourseFocus = 0;
};
