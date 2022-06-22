/* eslint-disable no-unused-vars */
type CommonDocumentData = { [field: string]: any };
/** An interface for `FirestoreDataConverter` common to both frontend firebase and admin firebase. */
export interface CommonFirestoreDataConverter<T> {
    toFirestore(modelObject: T): CommonDocumentData;
    fromFirestore(snapshot: { data(): CommonDocumentData }): T;
}

export const getTypedFirestoreDataConverter = <
    T
>(): CommonFirestoreDataConverter<T> => ({
    fromFirestore(snapshot) {
        return snapshot.data() as T;
    },
    toFirestore(userData) {
        return userData;
    },
});

export type UniqueIncrementerDocumentData = {
    readonly uniqueIncrementer: number;
};
