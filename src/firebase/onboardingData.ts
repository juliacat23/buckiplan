import store from '@/store';
import setUsernameData from './usernameData';
import { onboardingDataCollection } from '@/config/fbConfig';

export const setAppOnboardingData = (name: FirestoreUserName, onboarding: AppOnboardingData): void => {
  setUsernameData(name);
  onboardingDataCollection.doc(store.state.currentFirebaseUser.email).set({
    gradYear: onboarding.gradYear,
    gradSem: onboarding.gradSem,
    entranceYear: onboarding.entranceYear,
    entranceSem: onboarding.entranceSem,
    colleges: onboarding.college ? [{ acronym: onboarding.college }] : [],
    majors: onboarding.major.map((acronym) => ({ acronym })),
    degrees: onboarding.degree ? [{ acronym: onboarding.degree }] : [],
    minors: onboarding.minor.map((acronym) => ({ acronym })),
    prePrograms: onboarding.preProgram.map((acronym) => ({ acronym })),
    exam: onboarding.exam,
  });
};

const setExams = (exam: FirestoreAPIBExam[]) => {
  onboardingDataCollection.doc(store.state.currentFirebaseUser.email).update({ exam });
};

export const deleteTransferCredit = (code: string): void => {
  const [type, subject] = code.split(/ (.*)/);
  setExams(store.state.onboardingData.exam.filter((e) => !(e.type === type && e.subject === subject)));
};
