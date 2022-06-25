/* eslint-disable no-unused-vars */
type FirestoreUserName = {
  readonly firstName: string;
  readonly middleName?: string;
  readonly lastName: string;
};

type FirestoreSemesterCourse = {
  readonly crseId: number;
  readonly uniqueID: number;
  readonly code: string;
  readonly name: string;
  readonly credits: number;
  readonly creditRange: readonly [number, number];
  readonly semesters: readonly string[];
  readonly color: string;
};

type FirestoreSemesterPlaceholder = {
  readonly name: string;
  readonly uniqueID: number;
  readonly reqGroup: string;
  readonly slot: number;
  readonly startingSemester: number;
};

type AppFirestoreSemesterCourseWithRequirementID = FirestoreSemesterCourse & {
  readonly requirementID?: string;
};

type FirestoreSemesterSeason = 'Fall' | 'Spring' | 'Summer';
type FirestoreSemester = {
  readonly year: number;
  readonly season: FirestoreSemesterSeason;
  readonly courses: readonly (FirestoreSemesterCourse | FirestoreSemesterPlaceholder)[];
};

type FirestoreCollegeOrMajorOrMinor = { readonly acronym: string };
type FirestoreAPIBExam = {
  readonly type: 'AP' | 'IB';
  readonly score: number;
  readonly subject: string;
};

/** Represents the name of an exam a student can take for transfer credit */
type TransferExamType = 'AP' | 'IB' | 'DEPT';

type FirestoreTransferExam = {
  readonly examType: TransferExamType;
  readonly score: number;
  readonly subject: string;
};

type FirestoreCollegeMajorMinorOrGrad = { readonly acronym: string };
type FirestoreOnboardingUserData = {
  readonly gradYear: string;
  readonly gradSem: FirestoreSemesterSeason | '';
  readonly entranceYear: string;
  readonly entranceSem: FirestoreSemesterSeason | '';
  readonly colleges: readonly FirestoreCollegeMajorMinorOrGrad[];
  readonly majors: readonly FirestoreCollegeMajorMinorOrGrad[];
  readonly minors: readonly FirestoreCollegeMajorMinorOrGrad[];
  readonly prePrograms: readonly FirestoreCollegeMajorMinorOrGrad[];
  readonly exam: readonly FirestoreAPIBExam[];
};

type FirestoreCourseOptInOptOutChoices = {
  /** A list of requirements to opt-out */
  readonly optOut: readonly string[];
  /** It is for opting-in requirements that has a checker warning. */
  readonly acknowledgedCheckerWarningOptIn: readonly string[];
  /**
   * A list of requirement and their slots to opt-in arbitrarily.
   * It's for attaching completely unknown courses to a requirement
   * (e.g. opt-in CS 2112 for history requirement).
   */
  readonly arbitraryOptIn: readonly {
    readonly [requirement: string]: readonly string[];
  };
};

type FirestoreOverriddenFulfillmentChoices = {
  readonly [courseUniqueId: string]: FirestoreCourseOptInOptOutChoices;
};

type FirestoreUserData = {
  readonly name: FirestoreUserName;
  readonly semesters: readonly FirestoreSemester[];
  readonly orderByNewest: boolean;
  readonly toggleableRequirementChoices: AppToggleableRequirementChoices;
  readonly subjectColors: { readonly [subject: string]: string };
  readonly uniqueIncrementer: number;
  readonly userData: FirestoreOnboardingUserData;
};

type FirestoreTrackUsersData = {
  nameData: FirestoreTrackUsersNameData;
  semesterData: FirestoreTrackUsersSemesterData;
  onboardingData: FirestoreTrackUsersOnboardingData;
  timestamp: Date;
};

type FirestoreTrackUsersNameData = {
  totalUsers: number;
};

type FirestoreTrackUsersSemesterData = {
  totalSemesters: number;
  averageNumberSemesters: number;
  averageNumberOldSemesters: number;
  averageNumberNewSemesters: number;
};

type FirestoreTrackUsersOnboardingData = {
  undergradUsers: number;
  gradUsers: number;
  undergradAndGradUsers: number;
  majorFrequences: { readonly [group: string]: number };
  minorFrequencies: { readonly [group: string]: number };
  collegeFrequencies: { readonly [group: string]: number };
  graduateProgramFrequencies: { readonly [group: string]: number };
  averageNumberUndergradMajors: number;
  averageNumberUndergradMinors: number;
  averageNumberUndergradAPIBExams: number;
  entranceYearFrequencies: { readonly [group: string]: number };
  gradYearFrequencies: { readonly [group: string]: number };
};

interface OSUCourse {
  readonly crseId: number;
  readonly subject: string;
  readonly catalogNbr: string;
  readonly titleLong: string;
  readonly enrollGroups: readonly {
    readonly unitsMinimum: number;
    readonly unitsMaximum: number;
  }[];
  readonly catalogWhenOffered?: string | null;
  readonly catalogSatisfiesReq?: string;
  readonly catalogDescription?: string;
  readonly catalogPreReqs?: string;
  readonly acadCareer: string;
  readonly acadGroup: string;
}

interface OSUCourseFullDetail extends OSUCourse {
  readonly catalogAttributes?: string;
}

type AppOnboardingData = {
  readonly gradYear: string;
  readonly gradSem: FirestoreSemesterSeason | '';
  readonly entranceYear: string;
  readonly entranceSem: FirestoreSemesterSeason | '';
  readonly college?: string;
  readonly major: readonly string[];
  readonly minor: readonly string[];
  readonly preProgram: readonly string[];
  readonly exam: readonly FirestoreAPIBExam[];
};

type AppBottomBarCourse = {
  readonly uniqueID: number;
  readonly code: string;
  readonly name: string;
  readonly credits: number;
  readonly color: string;
  readonly semesters: readonly string[];
  description: string;
  prereqs: string;
};

type AppToggleableRequirementChoices = Readonly<Record<string, string>>;
