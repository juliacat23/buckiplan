import { AdvisorChecker } from './toolTypes';

export const lastNameRange =
  (startLetter: string, endLetter: string): AdvisorChecker =>
  (user: FirestoreUserName): boolean => {
    if (user.lastName) {
      const lastInitial = user.lastName.trim().charAt(0).toLowerCase();
      return lastInitial >= startLetter.toLowerCase() && lastInitial <= endLetter.toLowerCase();
    }
    return true;
  };

export const lastNameRanges =
  (range: [string, string][]): AdvisorChecker =>
  (user: FirestoreUserName): boolean => {
    if (user.lastName) {
      const lastInitial = user.lastName.trim().charAt(0).toLowerCase();
      for (const [start, end] of range) {
        if (lastInitial >= start.toLowerCase() && lastInitial <= end.toLowerCase()) {
          return true;
        }
      }
      return false; // if there is a last name, but it doesn't fit any range
    }
    return true; // if no last name, show all options
  };
