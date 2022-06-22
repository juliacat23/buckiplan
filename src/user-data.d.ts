/* eslint-disable no-unused-vars */
type FirestoreUserName = {
    readonly firstName: string;
    readonly middleName?: string;
    readonly lastName: string;
};

type FirestoreUserData = {
    readonly name: FirestoreUserName;
};
