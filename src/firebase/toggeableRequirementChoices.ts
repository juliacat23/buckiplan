import store from '@/store';
import { toggleableRequirementChoicesCollection } from '@/config/fbConfig';

const editToggleableRequirementChoices = (toggleableRequirementChoices: AppToggleableRequirementChoices): void => {
  toggleableRequirementChoicesCollection.doc(store.state.currentFirebaseUser.email).set(toggleableRequirementChoices);
};

const chooseToggleableRequirementOption = (requirementID: string, option: string): void => {
  editToggleableRequirementChoices({
    ...store.state.toggleableRequirementChoices,
    [requirementID]: option,
  });
};

export default chooseToggleableRequirementOption;
