import specialized from './specialize';
import featureFlagCheckers from '@/featuredFlags';
import { examCourseIds } from './examMapping';

/**
 * A collection of helper functions
 * that might be useful for both frontend components and requirement graph computation
 */

/**
 * @param course course object with useful information retrived from Cornell courses API.
 * @returns true if the course is AP/IB equivalent course or credit
 */
export const courseIsAPIB = (course: CourseTaken): boolean =>
  ['AP', 'IB'].includes(course.code.split(' ')[0]) || examCourseIds.has(course.courseId);

/**
 * The function converts a FireStoreSemesterCourse, the course structure stored in Firebase
 * user data, into a CourseTaken type used throughout the requirements sidebar.
 */
export function convertFirestoreSemesterCourseToCourseTaken({
  crseId,
  uniqueID,
  code,
  credits,
}: FirestoreSemesterCourse): CourseTaken {
  return { courseId: crseId, uniqueId: uniqueID, code, credits };
}

/**
 * Course double counting is a constraint relation between two requirements.
 * Instead of asking "does a requirement allow double counting with all other requirements?",
 * we frame it as "does requirementA and requirementB allow double counting with each other?"
 *
 * If true, a course can fulfill requirement A and requirement B without a constraint violation.
 * If false, edges from course c to requirementA and requirementB cause a constraint violation (c,(rA,rB)).
 */
export function allowCourseDoubleCountingBetweenRequirements(
  requirementA: RequirementWithIDSourceType,
  requirementB: RequirementWithIDSourceType
): boolean {
  const allowCourseDoubleCounting =
    requirementA.allowCourseDoubleCounting || requirementB.allowCourseDoubleCounting || false;

  // requirement source type is the same
  if (requirementA.sourceType === requirementB.sourceType) {
    return (
      // at least one requirement has the allowCourseDoubleCounting flag
      allowCourseDoubleCounting ||
      // or the source specific name is different
      requirementA.sourceSpecificName !== requirementB.sourceSpecificName
    );
  }
  // requirement source type is not the same
  // one source type is minor and one source type is college or major
  if (
    (requirementA.sourceType === 'Minor' && requirementB.sourceType !== 'Grad') ||
    (requirementA.sourceType !== 'Grad' && requirementB.sourceType === 'Minor')
  ) {
    return true;
  }
  // one source type is college and one source type is major
  if (
    (requirementA.sourceType === 'College' && requirementB.sourceType === 'Major') ||
    (requirementA.sourceType === 'Major' && requirementB.sourceType === 'College')
  ) {
    return allowCourseDoubleCounting;
  }

  // one source type is college or major or minor and one source type is grad
  return false;
}

type MatchedRequirementFulfillmentSpecificationBase = {
  readonly fulfilledBy: 'courses' | 'credits';
  readonly hasRequirementCheckerWarning: boolean;
  readonly eligibleCourses: readonly (readonly number[])[];
  readonly perSlotMinCount: readonly number[];
  readonly slotNames: readonly string[];
  readonly minNumberOfSlots?: number;
};
