import type { TypedVuexStore } from './store';

const createCourseCreditRange = (
    course: OSUCourse
): readonly [number, number] => {
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
