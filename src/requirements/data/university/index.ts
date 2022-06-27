import { Course, CollegeOrMajorRequirement } from '@/requirements/types';
const universityRequirements: readonly CollegeOrMajorRequirement[] = [
  {
    name: 'University Survey',
    description:
      'Every student at Ohio State enrolls in survey their first semester. Each college will have their own version of survey. This class is designed to introduce you to the university and its policies and procedures, as well as to your college and major.',
    source: 'https://aschonors.osu.edu/preorient/au-preview/classroom/survey',
    checker: [(course: Course): boolean => course.catalogSatisfiesReq?.includes('SURV') ?? false],
    fulfilledBy: 'credits',
    perSlotMinCount: [1],
  },
];

export default universityRequirements;
