/* eslint-disable no-undef */
import { Store } from 'vuex';
import * as fb from './config/fbConfig';
import { checkNotNull, updateSubjectColor } from './utilities';

type SimplifiedFirebaseUser = {
    readonly displayName: string;
    readonly email: string;
};

export type VuexStoreState = {
    currentFirebaseUser: SimplifiedFirebaseUser;
    userName: FirestoreUserName;
    subjectColors: Readonly<Record<string, string>>;
};

export class TypedVuexStore extends Store<VuexStoreState> {}

const store: TypedVuexStore = new TypedVuexStore({
    state: {
        currentFirebaseUser: null!,
        userName: { firstName: '', middleName: '', lastName: '' },
        subjectColors: {},
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

        setSubjectColors(
            state: VuexStoreState,
            colors: Readonly<Record<string, string>>
        ) {
            state.subjectColors = colors;
        },
    },
});

export const initalizeFirestoreListeners = (
    onLoad: () => void
): (() => void) => {
    const simplifiedUser = store.state.currentFirebaseUser;

    let userNameInitalLoadFinished = false;
    let subjectColorInitialLoadFinished = false;

    let emitted = false;

    const emitOnLoadWhenLoaded = (): void => {
        if (
            userNameInitalLoadFinished &&
            subjectColorInitialLoadFinished &&
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
                store.commit('setUserName', 'data');
            } else {
                const [firstName, lastName] =
                    simplifiedUser.displayName.split(' ');
                store.commit('setUserName', {
                    firstName,
                    middleName: '',
                    lastName,
                });
            }
            userNameInitalLoadFinished = true;
            emitOnLoadWhenLoaded();
        });

    const unsubscriber = () => {
        userNameUnsubscriber();
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
            const newSubjectColors = updateSubjectColor(
                subjectColors,
                color,
                code
            );
            store.commit('setSubjectColors', newSubjectColors);
            fb.subjectColorsCollection
                .doc(simplifiedUser.email)
                .set(newSubjectColors);
        });
};

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
