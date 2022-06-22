import { coursesColorSet } from '@/constants/colors';
import { fullCoursesArray } from '@/constants/courses/typed-full-courses';

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

export function allocateAllSubjectColor(
    subjectColors: Record<string, string>
): Record<string, string> {
    const subjectsColorsCopy = { ...subjectColors };
    getAllSubjects().forEach((subject) => {
        if (subjectsColorsCopy[subject]) return;
        subjectsColorsCopy[subject] =
            coursesColorSet[
                Math.floor(Math.random() * coursesColorSet.length)
            ].hex.substring(1);
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
