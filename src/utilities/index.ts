import { coursesColorSet } from './constants/colors';
import { fullCoursesArray } from './constants/courses/typed-full-courses';

export function checkNotNull<T>(value: T | null | undefined): T {
    if (value == null) throw new Error();
    return value;
}
