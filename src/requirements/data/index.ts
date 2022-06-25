import { RequirementsJson } from '../types';
import universityRequirements from './university';

// pre-professional programs
import predentRequirements from './prePrograms/predent';
import premedRequirements from './prePrograms/premed';
import preoptRequirements from './prePrograms/preopt';
import prepharmRequirements from './prePrograms/prepharm';
import preventRequirements from './prePrograms/prevet';

const json: RequirementsJson = {
  university: {
    UNI: {
      name: 'University',
      requirements: universityRequirements,
    },
  },
  college: {
    ARCH1: {
      name: 'Architecture',
      requirements: universityRequirements,
    },
    ARCH2: {
      name: 'Architecture',
      requirements: universityRequirements,
    },
    ASC1: {
      name: 'Arts and Sciences',
      requirements: universityRequirements,
    },
  },
  major: {
    ACCT: {
      name: 'Accounting',
      schools: ['ASC1'],
      requirements: universityRequirements,
    },
  },
  minor: {
    AAAS: {
      name: 'African American and African Studies',
      schools: ['ASC1'],
      requirements: universityRequirements,
    },
  },
  preProgram: {
    PREDENT: { name: 'Pre-Denistry', schools: ['ASC1'], requirements: predentRequirements },
    PREMED: {
      name: 'Pre-Medicine',
      schools: ['ASC1'],
      requirements: premedRequirements,
    },
    PREOPT: {
      name: 'Pre-Optometry',
      schools: ['ASC1'],
      requirements: preoptRequirements,
    },
    PREPHARM: {
      name: 'Pre-Pharmacy',
      schools: ['ASC1'],
      requirements: prepharmRequirements,
    },
    PREVET: {
      name: 'Pre-Veterinary Medicine',
      schools: ['ASC1'],
      requirements: preventRequirements,
    },
  },
};

export const colleges = [
  'ARCHBA1',
  'ARCH2',
  'ASC1',
  'ASC2',
  'BUS1',
  'BUS2',
  'DENT1',
  'DENT2',
  'EHE1',
  'EHE2',
  'ENG1',
  'ENG2',
  'ENR1',
  'ENR2',
  'FAES1',
  'FAES2',
  'HRS1',
  'HRS2',
  'MED1',
  'MED2',
  'NUR1',
  'NUR2',
  'PHR1',
  'PHR2',
  'PBAF1',
  'PBAF2',
  'PUBH1',
  'PUBH2',
  'SKW1',
  'SKW2',
] as const;
export type College = typeof colleges[number];

export default json;