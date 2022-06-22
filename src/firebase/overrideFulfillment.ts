import { overriddenFulfillmentChoicesCollection } from '@/config/fbConfig';
import store from '@/store';

export const updateRequirementChoice = (
    courseUniqueID: string | number,
    choiceUpdater: (
        choice: FirestoreCourseOptInOptOutChoices
    ) => FirestoreCourseOptInOptOutChoices
): void => {
    overriddenFulfillmentChoicesCollection
        .doc(store.state.currentFirebaseUser.email)
        .set({
            ...store.state.overridenFulfilmentChoices,
            [courseUniqueID]: choiceUpdater(
                store.state.overridenFulfilmentChoices[courseUniqueID] || {
                    arbitraryOptIn: {},
                    acknowledgedCheckerWarningOptIn: [],
                    optOut: [],
                }
            ),
        });
};
