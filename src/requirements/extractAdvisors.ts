import sourceRequirements from './data';
import { AdvisorPackage } from './toolTypes';

export function extractAdvisors({ type, acronym }: { type: AdvisorPackage['type']; acronym: string }): any {
  const { college, major, minor } = sourceRequirements;
  let whole;
  switch (type) {
    case 'major':
      whole = Object.entries(major).find(([n]) => n === acronym);
      break;
    case 'minor':
      whole = Object.entries(minor).find(([n]) => n === acronym);
      break;
    case 'college':
      whole = Object.entries(college).find(([n]) => n === acronym);
      break;
    default:
      whole = undefined;
      break;
  }

  if (whole) {
    const { advisors } = whole[1];
    return advisors;
  }
  return undefined;
}
