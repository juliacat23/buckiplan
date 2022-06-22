/* eslint-disable no-undef */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { getTypedFirestoreDataConverter } from './fbTypes';

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
    .withConverter(
        getTypedFirestoreDataConverter<Readonly<Record<string, string>>>()
    );
