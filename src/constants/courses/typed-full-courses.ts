import json from './full-courses.json';

const fullCoursesJsonWithStringKey = json as unknown as Readonly<
    Record<string, readonly OSUCourse[]>
>;

export type FullCourseJson = Readonly<Record<number, readonly OSUCourse[]>>;

export const fullCoursesJson: FullCourseJson = Object.fromEntries(
    Object.entries(fullCoursesJsonWithStringKey).map(
        ([stringCourseID, courses]) => [parseInt(stringCourseID, 10), courses]
    )
);

export const fullCoursesArray: readonly OSUCourse[] = Object.values(
    fullCoursesJsonWithStringKey
).flat();
