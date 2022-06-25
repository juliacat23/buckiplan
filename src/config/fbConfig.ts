/* eslint-disable no-undef */
import firebase from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { getTypedFirestoreDataConverter, SemesterDocumentData, UniqueIncrementerDocumentData } from './fbTypes';

let config;
config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

firebase.initializeApp(config);

// authentication with firebase
export const auth = firebase.auth();

// firestore db
export const db = firebase.firestore();

export const usernameCollection = db
  .collection('user-name')
  .withConverter(getTypedFirestoreDataConverter<FirestoreUserName>());

export const subjectColorsCollection = db
  .collection('user-subject-colors')
  .withConverter(getTypedFirestoreDataConverter<Readonly<Record<string, string>>>());

export const semestersCollection = db
  .collection('user-semesters')
  .withConverter(getTypedFirestoreDataConverter<SemesterDocumentData>());

export const toggleableRequirementChoicesCollection = db
  .collection('user-toggleable-requirement-choices')
  .withConverter(getTypedFirestoreDataConverter<AppToggleableRequirementChoices>());

export const overriddenFulfillmentChoicesCollection = db
  .collection('user-overridden-fulfillment-choices')
  .withConverter(getTypedFirestoreDataConverter<FirestoreOverriddenFulfillmentChoices>());

export const onboardingDataCollection = db
  .collection('user-onboarding-data')
  .withConverter(getTypedFirestoreDataConverter<FirestoreOnboardingUserData>());

export const trackUsersCollection = db
  .collection('track-users')
  .withConverter(getTypedFirestoreDataConverter<FirestoreTrackUsersData>());

export const uniqueIncrementerCollection = db
  .collection('user-unique-incrementer')
  .withConverter(getTypedFirestoreDataConverter<UniqueIncrementerDocumentData>());
