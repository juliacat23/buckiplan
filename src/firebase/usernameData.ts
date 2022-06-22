import { usernameCollection } from '@/config/fbConfig';
import store from '@/store';

// todo: why is it not recognizing interface from other file
type FirestoreUserName = {
    readonly firstName: string;
    readonly middleName?: string;
    readonly lastName: string;
};

const setUsernameData = (name: FirestoreUserName): void => {
    usernameCollection.doc(store.state.currentFirebaseUser.email).set({
        firstName: name.firstName,
        middleName: name.middleName || '',
        lastName: name.lastName,
    });
};

export default setUsernameData;
