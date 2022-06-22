import { overriddenFulfillmentChoicesCollection } from '@/config/fbConfig';
import store from '@/store';

export const updateRequirementChoice = (
  courseUniqueID: string | number,
  choiceUpdater: (choice: FirestoreCourseOptInOptOutChoices) => FirestoreCourseOptInOptOutChoices
): void => {
  overriddenFulfillmentChoicesCollection.doc(store.state.currentFirebaseUser.email).set({
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

export const toggleRequirementChoice = (
  courseUniqueID: string | number,
  requirementID: string,
  relevantRequirementChoiceType: keyof FirestoreCourseOptInOptOutChoices
): void =>
  updateRequirementChoice(courseUniqueID, (choice) => {
    switch (relevantRequirementChoiceType) {
      case 'optOut':
      case 'acknowledgedCheckerWarningOptIn': {
        const oldList = choice[relevantRequirementChoiceType];
        return {
          ...choice,
          [relevantRequirementChoiceType]: oldList.includes(requirementID)
            ? oldList.filter((it) => it !== requirementID)
            : [...oldList, requirementID],
        };
      }
      default:
        return choice;
    }
  });

export const updateRequirementChoices = (
  updater: (oldChoices: FirestoreOverriddenFulfillmentChoices) => FirestoreOverriddenFulfillmentChoices
): void => {
  overriddenFulfillmentChoicesCollection
    .doc(store.state.currentFirebaseUser.email)
    .set(updater(store.state.overridenFulfilmentChoices));
};

export const deleteCourseFromRequirementChoices = (courseUniqueID: string | number): void =>
  deleteCoursesFromRequirementChoices([courseUniqueID]);

export const deleteCoursesFromRequirementChoices = (courseUniqueIds: readonly (string | number)[]): void => {
  const courseUniqueIdStrings = new Set(courseUniqueIds.map((uniqueId) => uniqueId.toString()));
  overriddenFulfillmentChoicesCollection
    .doc(store.state.currentFirebaseUser.email)
    .set(
      Object.fromEntries(
        Object.entries(store.state.overridenFulfilmentChoices).filter(
          ([uniqueId]) => !courseUniqueIdStrings.has(uniqueId)
        )
      )
    );
};
