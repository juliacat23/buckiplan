import { EXAM_SPEC_ID, NO_FULFILLMENTS_COURSE_ID } from '../constants';

export type ExamFulfillment = {
  readonly courseId: number;
  readonly courseEquivalents?: Record<string, number[]>;
  readonly minimumScore: number;
  readonly credits: number;
  readonly majorsExcluded?: string[];
};

export type ExamFulfillments = Record<string, ExamFulfillment[]>;
export type ExamData = Record<'AP' | 'IB', ExamFulfillments>;

export const OTHER_COLLEGES = 'OTHER_COLLEGES';

const examData: ExamData = {
  AP:
    /** AP tests, scores and credit awarded
     *  https://registrar.osu.edu/priorlearning/ap-tests.html
     */
    {
      '2-D Art and Design': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [152170], // ART 2300
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      '3-D Art and Design': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [152172], // ART 2400
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'Art History': [
        {
          courseId: 124,
          minimumScore: 3,
          credits: 3,
          courseEquivalents: {
            [OTHER_COLLEGES]: [151559], // HISTART 2002
          },
        },
      ],
      Biology: [
        {
          courseId: 100,
          minimumScore: 3,
          credits: 4,
          courseEquivalents: {
            [OTHER_COLLEGES]: [149980], // BIO 1110
          },
          majorsExcluded: ['Pre-Medicine'],
        },
        {
          courseId: 125,
          minimumScore: 4,
          credits: 4,
          courseEquivalents: {
            [OTHER_COLLEGES]: [149989], // BIO 1113
          },
        },
        {
          courseId: 101,
          minimumScore: 5,
          credits: 8,
          courseEquivalents: {
            [OTHER_COLLEGES]: [149989, 150021], // BIO 1113 + BIO 1114
          },
        },
      ],
      'Calculus AB': [
        {
          courseId: 102,
          minimumScore: 3,
          courseEquivalents: { [OTHER_COLLEGES]: [151927] }, // MATH 1151
          credits: 5,
        },
      ],
      'Calculus BC': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [151927, 151933], // MATH 1151 + MATH 1152
          },
          minimumScore: 3,
          credits: 10,
        },
      ],
      Chemistry: [
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [149722], // CHEM 1110
          },
          minimumScore: 3,
          credits: 5,
        },
        {
          courseId: 105,
          courseEquivalents: {
            [OTHER_COLLEGES]: [149724], // CHEM 1210
          },
          minimumScore: 4,
          credits: 5,
          majorsExcluded: ['Pre-Medicine'],
        },
      ],
      'Chinese Language and Culture	': [
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [156856, 156859], // CHINESE 1101 + CHINESE 1102
          },
          minimumScore: 3,
          credits: 8,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [156856, 156859, 156862], // CHINESE 1101 + CHINESE 1102 + CHINESE 1103
          },
          minimumScore: 4,
          credits: 12,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [156856, 156859, 156862, 15686], // CHINESE 1101 + CHINESE 1102 + CHINESE 1103 + CHINESE 2102
          },
          minimumScore: 5,
          credits: 17,
        },
      ],
      'Computer Science Principles': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [1504], // CSE 1211
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'Computer Science A': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [150494], // CSE 1223
          },
          minimumScore: 3,
          credits: 3,
        },
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [150494, 150496], // CSE 1223 + CSE 2123
          },
          minimumScore: 4,
          credits: 6,
        },
      ],
      Drawing: [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [152167], // ART 2100
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'Economics: Microeconomics': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [152673], // ECON 2001
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'Economics: Macroeconomics': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [152675], // ECON 2002
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'English Language and Composition': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [150416], // ENGLISH 1100.01
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'English Literature and Composition': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [150418], // ENGLISH 1100.02
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'Environmental and Natural Resources': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [152036], // ENR 2100
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'French Language and Culture': [
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [154691, 154693], // FRENCH 1101 + FRENCH 1102
          },
          minimumScore: 3,
          credits: 8,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [154691, 156859, 154695], // FRENCH 1101 + FRENCH 1102 + FRENCH 1103
          },
          minimumScore: 4,
          credits: 12,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [154691, 156859, 154695, 154705], // FRENCH 1101 + FRENCH 1102 + FRENCH 1103 + FRENCH 2101
          },
          minimumScore: 5,
          credits: 15,
        },
      ],
      'German Language and Culture': [
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [160699, 160840], // GERMAN 1101 + GERMAN 1102
          },
          minimumScore: 3,
          credits: 8,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [160699, 160840, 155690], // GERMAN 1101 + GERMAN 1102 + GERMAN 1103
          },
          minimumScore: 4,
          credits: 12,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [160699, 160840, 155690, 155692], // GERMAN 1101 + GERMAN 1102 + GERMAN 1103 + GERMAN 2101
          },
          minimumScore: 5,
          credits: 15,
        },
      ],
      'Government and Politics: United States': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [151380], // POLITSC 1100
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'Government and Politics: Comparative': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [151401], // POLITSC 1200
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'History: European': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [158356], // HISTORY 1212
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'History: United States': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [158350, 158351], // HISTORY 1151 + HISTORY 1152
          },
          minimumScore: 3,
          credits: 6,
        },
      ],
      'History: World': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [158357, 158358], // HISTORY 1681 + HISTORY 1682
          },
          minimumScore: 3,
          credits: 6,
        },
      ],
      'Human Geography': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [149194], // GEOG 2400
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'Italian Language and Culture': [
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [163400, 163401], // ITALIAN 1101 + ITALIAN 1102
          },
          minimumScore: 3,
          credits: 8,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [163400, 163401, 163402], // ITALIAN 1101 + ITALIAN 1102 + ITALIAN 1103
          },
          minimumScore: 4,
          credits: 12,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [163400, 163401, 163402, 151067], // ITALIAN 1101 + ITALIAN 1102 + ITALIAN 1103 + ITALIAN 2102
          },
          minimumScore: 5,
          credits: 15,
        },
      ],
      'Japanese Language and Culture': [
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [156854, 156916], // JAPANSE 1101 + JAPANSE 1102
          },
          minimumScore: 3,
          credits: 8,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [156854, 156916, 156919], // JAPANSE 1101 + JAPANSE 1102 + JAPANSE 1103
          },
          minimumScore: 4,
          credits: 12,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [156854, 156916, 156919, 156922], // JAPANSE 1101 + JAPANSE 1102 + JAPANSE 1103 + JAPANSE 2102
          },
          minimumScore: 5,
          credits: 17,
        },
      ],
      Latin: [
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [160196, 160197], // LATIN 1101 + LATIN 1102
          },
          minimumScore: 3,
          credits: 10,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [160196, 160197, 156743], // LATIN 1101 + LATIN 1102 + LATIN 1103
          },
          minimumScore: 4,
          credits: 13,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [160196, 160197, 156743, 15674], // LATIN 1101 + LATIN 1102 + LATIN 1103 + LATIN 2105
          },
          minimumScore: 5,
          credits: 16,
        },
      ],
      'Music Theory': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [158156], // MUSIC 1121
          },
          minimumScore: 3,
          credits: 2,
        },
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [158159, 158161], // MUSIC 2221 + MUSIC 2224
          },
          minimumScore: 4,
          credits: 4,
        },
      ],
      'Physics 1': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [147661], // PHYSICS 1200
          },
          minimumScore: 3,
          credits: 5,
          majorsExcluded: ['Pre-Medicine'],
        },
      ],
      'Physics 2': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [147666], // PHYSICS 1201
          },
          minimumScore: 3,
          credits: 5,
          majorsExcluded: ['Pre-Medicine'],
        },
      ],
      'Physics C: Mechanics': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [147687], // PHYSICS 1250
          },
          minimumScore: 3,
          credits: 5,
          majorsExcluded: ['Pre-Medicine'],
        },
      ],
      'Physics C: Electricity and Magnetism': [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [147710], // PHYSICS 1251
          },
          minimumScore: 3,
          credits: 5,
          majorsExcluded: ['Pre-Medicine'],
        },
      ],
      Psychology: [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [150370], // PSYCH 1110
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      Research: [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [EXAM_SPEC_ID], // COMSTD SPL
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      Seminar: [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [EXAM_SPEC_ID], // COMSTD SPL
          },
          minimumScore: 3,
          credits: 3,
        },
      ],
      'Spanish Language and Culture': [
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [150686, 160086], // SPANISH 1101 + SPANISH 1102
          },
          minimumScore: 3,
          credits: 8,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [150686, 160086, 150717, 150758], // SPANISH 1101 + SPANISH 1102 + SPANISH 1103 + SPANISH 2202
          },
          minimumScore: 4,
          credits: 15,
        },
      ],
      'Spanish Literature and Culture': [
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [150686, 160086], // SPANISH 1101 + SPANISH 1102
          },
          minimumScore: 3,
          credits: 8,
        },
        {
          courseId: 104,
          courseEquivalents: {
            [OTHER_COLLEGES]: [150686, 160086, 150717, 150758], // SPANISH 1101 + SPANISH 1102 + SPANISH 1103 + SPANISH 2202
          },
          minimumScore: 4,
          credits: 15,
        },
      ],
      Statistics: [
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [149364], // STAT 1450
          },
          minimumScore: 3,
          credits: 3,
        },
        {
          courseId: 103,
          courseEquivalents: {
            [OTHER_COLLEGES]: [149365], // STAT 2450
          },
          minimumScore: 4,
          credits: 3,
        },
      ],
    },
  IB: {
    /** IB tests, scores and credit awarded
     * Ohio State only awards EM credit for IB scores of 4 or higher that are achieved
     * in the higher level (HL) programs and approved by the proper department.
     *  No credit is awarded for standard level (SL) scores.
     * https://registrar.osu.edu/priorlearning/ib-tests.html
     */
    'Arabic A1': [
      {
        courseId: 200,
        courseEquivalents: {
          [OTHER_COLLEGES]: [159681], // ARABIC 2702
        },
        minimumScore: 4,
        credits: 3,
      },
    ],
    'American History': [
      {
        courseId: 202,
        courseEquivalents: {
          [OTHER_COLLEGES]: [158350, EXAM_SPEC_ID], // HISTORY 1151 + HIST special
        },
        minimumScore: 4,
        credits: 6,
      },
    ],
    Biology: [
      {
        courseId: 203,
        courseEquivalents: {
          [OTHER_COLLEGES]: [149989, 150021], // BIO 1113 + BIO 1114
        },
        minimumScore: 4,
        credits: 8,
        majorsExcluded: ['Pre-Medicine'],
      },
    ],
    Chemistry: [
      {
        courseId: 204,
        courseEquivalents: {
          [OTHER_COLLEGES]: [149724], // CHEM 1210
        },
        minimumScore: 4,
        credits: 5,
        majorsExcluded: ['Pre-Medicine'],
      },
    ],
    Economics: [
      {
        courseId: 205,
        courseEquivalents: { [OTHER_COLLEGES]: [152673, 152675] }, // ECON 2001 + ECON 2002
        minimumScore: 4,
        credits: 6,
      },
    ],
    'English A: Literature': [
      {
        courseId: 206,
        courseEquivalents: { [OTHER_COLLEGES]: [150416, 150430] }, // ENGLISH 1110 + ENGLISH 2220
        minimumScore: 4,
        credits: 6,
      },
    ],
    'English Language and Literature': [
      {
        courseId: 207,
        courseEquivalents: { [OTHER_COLLEGES]: [150416, 15048] }, // ENGLISH 1110 + ENGLISH 1167H
        minimumScore: 4,
        credits: 6,
      },
    ],
    Film: [
      {
        courseId: 208,
        courseEquivalents: {
          [OTHER_COLLEGES]: [150444], // ENGLISH 2263
        },
        minimumScore: 4,
        credits: 34,
      },
    ],
    'French A: Literature': [
      {
        courseId: 209,
        courseEquivalents: {
          [OTHER_COLLEGES]: [154693, 154695], // FRENCH 1102 + FRENCH 1103
        },
        minimumScore: 6,
        credits: 8,
      },
    ],
    'French Language and Literature': [
      {
        courseId: 210,
        courseEquivalents: {
          [OTHER_COLLEGES]: [154693, 154695], // FRENCH 1102 + FRENCH 1103
        },
        minimumScore: 6,
        credits: 8,
      },
    ],
    'French B': [
      {
        courseId: 211,
        courseEquivalents: {
          [OTHER_COLLEGES]: [154693, 154695], // FRENCH 1102 + FRENCH 1103
        },
        minimumScore: 6,
        credits: 8,
      },
    ],
    Geography: [
      {
        courseId: 212,
        courseEquivalents: {
          [OTHER_COLLEGES]: [149194], // GEOG 2400
        },
        minimumScore: 4,
        credits: 3,
      },
    ],
    'History of Europe': [
      {
        courseId: 213,
        courseEquivalents: {
          [OTHER_COLLEGES]: [158468, EXAM_SPEC_ID], // HISTORY 3253 + HIST special
        },
        minimumScore: 4,
        credits: 6,
      },
    ],
    'History of Asia/Ocenia': [
      {
        courseId: 214,
        courseEquivalents: {
          [OTHER_COLLEGES]: [158408, EXAM_SPEC_ID], // HISTORY 2650 + HIST special
        },
        minimumScore: 6,
        credits: 8,
      },
    ],
    'Mathematics (taken 2020 or earlier)': [
      {
        courseId: 215,
        courseEquivalents: {
          [OTHER_COLLEGES]: [151927], // MATH 1151
        },
        minimumScore: 4,
        credits: 5,
      },
      {
        courseId: 216,
        courseEquivalents: {
          [OTHER_COLLEGES]: [151927, 151933], // MATH 1151 + MATH 1152
        },
        minimumScore: 6,
        credits: 10,
      },
    ],
    'Mathematics (taken 2021 and forward)': [
      {
        courseId: 217,
        courseEquivalents: {
          [OTHER_COLLEGES]: [NO_FULFILLMENTS_COURSE_ID], // MATH IB taken 2021 and forward will not receive Ohio State credit
        },
        minimumScore: 1,
        credits: 0,
      },
    ],
    Philosophy: [
      {
        courseId: 218,
        courseEquivalents: {
          [OTHER_COLLEGES]: [155405], // PHILOS 1100
        },
        minimumScore: 4,
        credits: 3,
      },
    ],
    Physics: [
      {
        courseId: 219,
        courseEquivalents: {
          [OTHER_COLLEGES]: [147661, 147666], // PHYSICS 1200 + PHYSICS 1201
        },
        minimumScore: 4,
        credits: 10,
        majorsExcluded: ['Pre-Medicine'],
      },
    ],
    Psychology: [
      {
        courseId: 220,
        courseEquivalents: {
          [OTHER_COLLEGES]: [150370], // PSYCH 1100
        },
        minimumScore: 4,
        credits: 3,
      },
    ],
    'Social and Cultural Anthropology': [
      {
        courseId: 221,
        courseEquivalents: {
          [OTHER_COLLEGES]: [151343], // ANTHROP 2202
        },
        minimumScore: 4,
        credits: 3,
      },
    ],
    'Spanish Language and Literature': [
      {
        courseId: 222,
        courseEquivalents: {
          [OTHER_COLLEGES]: [150686, 160086], // SPANISH 1101 + SPANISH 1102
        },
        minimumScore: 5,
        credits: 8,
      },
      {
        courseId: 223,
        courseEquivalents: {
          [OTHER_COLLEGES]: [150686, 160086, 150717], // SPANISH 1101 + SPANISH 1102 + SPANISH 1103
        },
        minimumScore: 6,
        credits: 12,
      },
    ],
    'Spanish A: Literature': [
      {
        courseId: 224,
        courseEquivalents: {
          [OTHER_COLLEGES]: [150686, 160086, 150717], // SPANISH 1101 + SPANISH 1102 + SPANISH 1103
        },
        minimumScore: 6,
        credits: 12,
      },
    ],
    'Spanish B': [
      {
        courseId: 225,
        courseEquivalents: {
          [OTHER_COLLEGES]: [150686, 160086, 150717], // SPANISH 1101 + SPANISH 1102 + SPANISH 1103
        },
        minimumScore: 6,
        credits: 12,
      },
    ],
    'World History': [
      {
        courseId: 226,
        courseEquivalents: {
          [OTHER_COLLEGES]: [158408, EXAM_SPEC_ID], // HISTORY 2650 + HIST special
        },
        minimumScore: 4,
        credits: 6,
      },
    ],
  },
};

export default examData;
