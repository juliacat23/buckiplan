/* eslint-disable no-undef */
import { Store } from 'vuex';
import * as fb from './config/fbConfig';
import { createAppOnboardingData } from './userDataConverter';
import { RequirementFulfillmentGraph } from '@/requirements/requirementGraph';
import {
  checkNotNull,
  updateSubjectColor,
  getCurrentSeason,
  getCurrentYear,
  sortedSemesters,
  isCourseTaken,
  isPlaceholderCourse,
} from './utilities';

type DerivedCoursesData = {
  readonly duplicatedCourseCodeSet: ReadonlySet<string>;
  readonly courseMap: Readonly<Record<number, FirestoreSemesterCourse>>;
  readonly courseToSemesterMap: Readonly<Record<number, FirestoreSemester>>;
};

type SimplifiedFirebaseUser = {
  readonly displayName: string;
  readonly email: string;
};

export type VuexStoreState = {
  currentFirebaseUser: SimplifiedFirebaseUser;
  userName: FirestoreUserName;
  onboardingData: AppOnboardingData;
  semesters: readonly FirestoreSemester[];
  dervivedCoursesData: DerivedCoursesData;
  orderByNewest: boolean;
  subjectColors: Readonly<Record<string, string>>;
  toggleableRequirementChoices: AppToggleableRequirementChoices;
  overridenFulfilmentChoices: FirestoreOverriddenFulfillmentChoices;
  userRequirementsMap: Readonly<Record<string, RequirementWithIDSourceType>>;
  dangerousRequirementFulfillmentGraph: RequirementFulfilmentGraph<
    String,
    CourseTaken
  >;
  safeRequirementFulfilmentGraph: RequirementFilfilmentGraph<
    string,
    CourseTaken
  >;
  courseToRequirementsInConstraintViolations: ReadonlyMap<
    string | number,
    Set<string[]>
  >;
  doubleCountedCourseUniqueIDSet: ReadonlySet<string | number>;
  groupedRequirementFulfillmentReport: readonly GroupedRequirementFulfillmentReport[];
  uniqueIncrememner: number;
  isTeleportModalOpen: boolean;
};

export class TypedVuexStore extends Store<VuexStoreState> {}

const store: TypedVuexStore = new TypedVuexStore({
  state: {
    currentFirebaseUser: null!,
    userName: { firstName: '', middleName: '', lastName: '' },
    subjectColors: {},
    onboardingData: {
      gradYear: '',
      gradSem: '',
      entranceYear: '',
      entranceSem: '',
      college: '',
      major: [],
      degree: '',
      minor: [],
      preProgram: [],
      exam: [],
    },
    orderByNewest: false,
    semesters: [],
    dervivedCoursesData: {
      duplicatedCourseCodeSet: new Set(),
      courseMap: {},
      courseToSemesterMap: {},
    },
    toggleableRequirementChoices: {},
    overridenFulfilmentChoices: {},
    userRequirementsMap: {},
    dangerousRequirementFulfillmentGraph: null,
    safeRequirementFulfilmentGraph: null,
    courseToRequirementsInConstraintViolations: new Map(),
    doubleCountedCourseUniqueIDSet: new Set(),
    groupedRequirementFulfillmentReport: [],
    uniqueIncrememner: 0,
    isTeleportModalOpen: false,
  },
  actions: {},
  mutations: {
    setCurrentFirebaseUser(
      state: VuexStoreState,
      user: SimplifiedFirebaseUser
    ) {
      state.currentFirebaseUser = user;
    },
    setUserName(state: VuexStoreState, userName: FirestoreUserName) {
      state.userName = userName;
    },
    setOnboardingData(
      state: VuexStoreState,
      onboardingData: AppOnboardingData
    ) {
      state.onboardingData = onboardingData;
    },

    setOrderByNewest(state: VuexStoreState, orderByNewest: boolean) {
      state.orderByNewest = orderByNewest;
    },
    setSemesters(
      state: VuexStoreState,
      semesters: readonly FirestoreSemester[]
    ) {
      state.semesters = sortedSemesters(semesters, state.orderByNewest);
    },

    setDerivedCourseData(state: VuexStoreState, data: DerivedCoursesData) {
      state.dervivedCoursesData = data;
    },
    setSubjectColors(
      state: VuexStoreState,
      colors: Readonly<Record<string, string>>
    ) {
      state.subjectColors = colors;
    },
    setToggleableRequirementChoices(
      state: VuexStoreState,
      toggleableRequirementChoices: AppToggleableRequirementChoices
    ) {
      state.toggleableRequirementChoices = toggleableRequirementChoices;
    },
    setOverriddenFulfillmentChoices(
      state: VuexStoreState,
      overridenFulfilmentChoices: FirestoreOverriddenFulfillmentChoices
    ) {
      state.overridenFulfilmentChoices = overridenFulfilmentChoices;
    },
    setRequirementData(
      state: VuexStoreState,
      data: Pick<
        VuexStoreState,
        | 'userRequirementsMap'
        | 'dangerousRequirementFulfillmentGraph'
        | 'safeRequirementFulfilmentGraph'
        | 'courseToRequirementsInConstraintViolations'
        | 'doubleCountedCourseUniqueIDSet'
        | 'groupedRequirementFulfillmentReport'
      >
    ) {
      state.userRequirementsMap = data.userRequirementsMap;
      state.dangerousRequirementFulfillmentGraph =
        data.dangerousRequirementFulfillmentGraph;
      state.safeRequirementFulfilmentGraph =
        data.safeRequirementFulfilmentGraph;
      state.courseToRequirementsInConstraintViolations =
        data.courseToRequirementsInConstraintViolations;
      state.doubleCountedCourseUniqueIDSet =
        data.doubleCountedCourseUniqueIDSet;
      state.groupedRequirementFulfillmentReport =
        data.groupedRequirementFulfillmentReport;
    },
    setUniqueIncrementer(state: VuexStoreState, newIncrementeralue: number) {
      state.uniqueIncrememner = newIncrementeralue;
    },
    setIsTeleportModalOpen(
      state: VuexStoreState,
      newTeleportModalValue: boolean
    ) {
      state.isTeleportModalOpen = newTeleportModalValue;
    },
  },
});

const autoRecomputeDerivedData = (): (() => void) =>
  store.subscribe((payload, state) => {
    if (payload.type === 'setOrderByNewest') {
      store.commit(
        'setSemesters',
        sortedSemesters(state.semesters, state.orderByNewest)
      );
    }
    // Recompute courses
    if (payload.type === 'setSemesters') {
      const allCourseSet = new Set<string>();
      const duplicatedCourseCodeSet = new Set<string>();
      const courseMap: Record<number, FirestoreSemesterCourse> = {};
      const courseToSemesterMap: Record<number, FirestoreSemester> = {};
      state.semesters.forEach((semester) => {
        semester.courses.forEach((course) => {
          if (isPlaceholderCourse(course)) {
            return;
          }

          const { code } = course;
          if (allCourseSet.has(code)) {
            duplicatedCourseCodeSet.add(code);
          } else {
            allCourseSet.add(code);
          }
          courseMap[course.uniqueID] = course;
          courseToSemesterMap[course.uniqueID] = semester;
        });
      });
      const derivedCourseData: DerivedCoursesData = {
        duplicatedCourseCodeSet,
        courseMap,
        courseToSemesterMap,
      };
      store.commit('setDerivedCourseData', derivedCourseData);
    }
    // Recompute requirements
    if (
      payload.type === 'setOnboardingData' ||
      payload.type === 'setSemesters' ||
      payload.type === 'setToggleableRequirementChoices' ||
      payload.type === 'setOverriddenFulfillmentChoices'
    ) {
      if (state.onboardingData.college !== '') {
        store.commit(
          'setRequirementData',
          computeGroupedRequirementFulfillmentReports(
            state.semesters,
            state.onboardingData,
            state.toggleableRequirementChoices,
            state.overridenFulfilmentChoices
          )
        );
      }
    }
  });

export const initializeFirestoreListeners = (
  onLoad: () => void
): (() => void) => {
  const simplifiedUser = store.state.currentFirebaseUser;

  let userNameInitialLoadFinished = false;
  let onboardingDataInitialLoadFinished = false;
  let semestersInitialLoadFinished = false;
  let orderByNewestInitialLoadFinished = false;
  let toggleableRequirementChoiceInitialLoadFinished = false;
  let overriddenFulfillmentChoiceInitialLoadFinished = false;
  let subjectColorInitialLoadFinished = false;
  let uniqueIncrementerInitialLoadFinished = false;

  let emitted = false;

  const emitOnLoadWhenLoaded = (): void => {
    if (
      userNameInitialLoadFinished &&
      onboardingDataInitialLoadFinished &&
      semestersInitialLoadFinished &&
      orderByNewestInitialLoadFinished &&
      toggleableRequirementChoiceInitialLoadFinished &&
      overriddenFulfillmentChoiceInitialLoadFinished &&
      subjectColorInitialLoadFinished &&
      uniqueIncrementerInitialLoadFinished &&
      !emitted
    ) {
      emitted = true;
      onLoad();
    }
  };

  const userNameUnsubscriber = fb.usernameCollection
    .doc(simplifiedUser.email)
    .onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (data) {
        store.commit('setUserName', data);
      } else {
        const [firstName, lastName] = simplifiedUser.displayName.split(' ');
        store.commit('setUserName', { firstName, middleName: '', lastName });
      }
      userNameInitialLoadFinished = true;
      emitOnLoadWhenLoaded();
    });
  const onboardingDataUnsubscriber = fb.onboardingDataCollection
    .doc(simplifiedUser.email)
    .onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (data) {
        store.commit('setOnboardingData', createAppOnboardingData(data));
      }
      onboardingDataInitialLoadFinished = true;
      emitOnLoadWhenLoaded();
    });
  fb.semestersCollection
    .doc(simplifiedUser.email)
    .get()
    .then((snapshot) => {
      const data = snapshot.data();
      if (data) {
        const { orderByNewest, semesters } = data;
        store.commit('setSemesters', semesters);
        // if user hasn't yet chosen an ordering, choose true by default
        store.commit(
          'setOrderByNewest',
          orderByNewest === undefined ? true : orderByNewest
        );
      } else {
        const newSemester: FirestoreSemester = {
          year: getCurrentYear(),
          season: getCurrentSeason(),
          courses: [],
        };
        store.commit('setSemesters', [newSemester]);
        fb.semestersCollection.doc(simplifiedUser.email).set({
          orderByNewest: true,
          semesters: [newSemester],
        });
      }
      semestersInitialLoadFinished = true;
      orderByNewestInitialLoadFinished = true;
      emitOnLoadWhenLoaded();
    });
  const toggleableRequirementChoiceUnsubscriber =
    fb.toggleableRequirementChoicesCollection
      .doc(simplifiedUser.email)
      .onSnapshot((snapshot) => {
        const toggleableRequirementChoices = snapshot.data() || {};
        store.commit(
          'setToggleableRequirementChoices',
          toggleableRequirementChoices
        );
        toggleableRequirementChoiceInitialLoadFinished = true;
        emitOnLoadWhenLoaded();
      });
  const overriddenFulfillmentChoiceUnsubscriber =
    fb.overriddenFulfillmentChoicesCollection
      .doc(simplifiedUser.email)
      .onSnapshot((snapshot) => {
        const overriddenFulfillmentChoices = snapshot.data() || {};
        store.commit(
          'setOverriddenFulfillmentChoices',
          overriddenFulfillmentChoices
        );
        overriddenFulfillmentChoiceInitialLoadFinished = true;
        emitOnLoadWhenLoaded();
      });
  fb.subjectColorsCollection
    .doc(simplifiedUser.email)
    .get()
    .then((snapshot) => {
      const subjectColors = snapshot.data() || {};
      // Pre-allocate all subject colors during this initialization step.
      const newSubjectColors = allocateAllSubjectColor(subjectColors);
      store.commit('setSubjectColors', newSubjectColors);
      fb.subjectColorsCollection
        .doc(simplifiedUser.email)
        .set(newSubjectColors);
      subjectColorInitialLoadFinished = true;
      emitOnLoadWhenLoaded();
    });
  const uniqueIncrementerUnsubscriber = fb.uniqueIncrementerCollection
    .doc(simplifiedUser.email)
    .onSnapshot((snapshot) => {
      const data = snapshot.data();
      store.commit(
        'setUniqueIncrementer',
        data == null ? 0 : data.uniqueIncrementer
      );
      uniqueIncrementerInitialLoadFinished = true;
      emitOnLoadWhenLoaded();
    });
  const derivedDataComputationUnsubscriber = autoRecomputeDerivedData();

  const unsubscriber = () => {
    userNameUnsubscriber();
    onboardingDataUnsubscriber();
    toggleableRequirementChoiceUnsubscriber();
    overriddenFulfillmentChoiceUnsubscriber();
    uniqueIncrementerUnsubscriber();
    derivedDataComputationUnsubscriber();
  };
  return unsubscriber;
};

export const updateSubjectColorData = (color: string, code: string): void => {
  const simplifiedUser = store.state.currentFirebaseUser;
  fb.subjectColorsCollection
    .doc(simplifiedUser.email)
    .get()
    .then((snapshot) => {
      const subjectColors = snapshot.data() || {};
      const newSubjectColors = updateSubjectColor(subjectColors, color, code);
      store.commit('setSubjectColors', newSubjectColors);
      fb.subjectColorsCollection
        .doc(simplifiedUser.email)
        .set(newSubjectColors);
    });
};

export const isCourseConflict = (uniqueId: string | number): boolean =>
  featureFlagCheckers.isRequirementConflictsEnabled() &&
  store.state.doubleCountedCourseUniqueIDSet.has(uniqueId);

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    const simplifiedUser = {
      displayName: checkNotNull(user.displayName),
      email: checkNotNull(user.email),
    };
    store.commit('setCurrentFirebaseUser', simplifiedUser);
  }
});

export default store;

export default store;
