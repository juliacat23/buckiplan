/** Exam course ID for exam/transfer course that does not satisify requiremens, only counts towards credit. */
export const EXAM_SPEC_ID = 10;

/** Exam course ID for special course that satisfies no requirements (not even total credits). */
export const NO_FULFILLMENTS_COURSE_ID = 11;

/** List of special course IDs */
export const SPECIAL_COURSES = {
  NO_FULFILLMENTS: NO_FULFILLMENTS_COURSE_ID,
  EXAM_SPEC: EXAM_SPEC_ID,
};
