<template>
  <div class="info">
    <div class="info-section-wrapper">
      <div>
        <div class="section">
          <h1 class="info-head">Credits</h1>
          <p class="info-fact">{{ courseObj.credits }}</p>
        </div>
        <div class="section">
          <h1 class="info-head">Offered</h1>
          <p class="info-fact">{{ courseSemesters }}</p>
        </div>
      </div>
      <div>
        <div class="section">
          <h1 class="info-head">Instruction Mode</h1>
          <p class="info-fact">{{ courseObj.mode }}</p>
        </div>
        <div class="section">
          <h1 class="info-head">Enrollment Information</h1>
          <p class="info-fact">{{ courseObj.instruction }}</p>
        </div>
      </div>
      <!-- <div>
        <div class="section">
          <h1 class="info-head">Distribution Category</h1>
          <p class="info-fact" v-for="distributionCategory in courseDistributions" :key="distributionCategory">
            {{ distributionCategory }}
          </p>
        </div> -->

    </div>
    <div class="info-link">
      <!-- <a :href="rosterLink" class="info-link-blue" target="_blank" @click="clickViewCourseInformationOnRoster()">
        View Course Information on Roster
        <span class="info-link-blue-img"><img src="@/assets/images/link-blue.svg" alt="link arrow" /></span>
      </a> -->
    </div>
  </div>
  <div class="geInfo">
    <div class="geSection">
      <h1 class="geInfo-head">GE Attributes</h1>
      <p class="geInfo-fact">{{ courseObj.prereqs }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { GTagEvent } from '@/gtag';

const joinOrNAString = (arr: readonly string[]): string =>
  arr.length !== 0 && arr[0] !== '' ? arr.join(', ') : 'N/A';

const naIfEmptyStringArray = (arr: readonly string[]): readonly string[] =>
  arr && arr.length !== 0 && arr[0] !== '' ? arr : ['N/A'];

const cleanCourseDistributionsArray = (distributions: readonly string[]): readonly string[] => {
  // Iterates over distributions array and cleans every entry
  // Removes stray parentheses, spaces, and commas
  let matches: string[] = [];
  if (distributions[0] === '') {
    matches = ['N/A'];
  } else {
    for (let i = 0; i < distributions.length; i += 1) {
      distributions[i].replace(/[A-Za-z0-9-]+/g, d => {
        matches.push(d);
        return d;
      });
    }
  }

  return matches;
};

export default defineComponent({
  props: {
    courseObj: { type: Object as PropType<AppBottomBarCourse>, required: true },
  },

  computed: {
    courseSemesters(): string {
      return joinOrNAString(this.courseObj.semesters);
    },



  },

  methods: {
    clickViewCourseInformationOnRoster(): void {
      GTagEvent(this.$gtag, 'bottom-bar-view-course-information-on-roster');
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/scss/variables';


.info {
  width: 100%;
  padding-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0rem;

  &-head {
    margin-top: 5px;
    font-weight: 500;
    font-size: 12px;
    color: $darkGray2;
    margin-bottom: 0rem;
  }

  &-fact {
    padding-right: 10px;
    font-size: 16px;
    color: $primaryGray;
    margin-bottom: 0rem;
  }

  &-link {
    font-size: 16px;
    line-height: 16px;
    text-decoration-line: underline;
    margin-top: inherit;

    &-blue {
      color: $yuxuanBlue;
      // TODO: update picture
      font-weight: 500;

      &-img {
        margin-left: 0.2rem;
      }
    }
  }
}

.section {
  margin-bottom: 8px;
  float: left;
  width: 50%;
  height: inherit;
}

.geSection {
  margin-bottom: 8px;
  float: left;
  width: 100%;
  height: inherit;
}

.wrapper {
  display: grid;
  grid-auto-flow: column;
}

.geInfo {
  width: 100%;
  padding-right: 20px;
  padding-left: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0rem;

  &-head {
    margin-top: 5px;
    font-weight: 500;
    font-size: 12px;
    color: $darkGray2;
    margin-bottom: 0rem;
  }

  &-fact {
    padding-right: 10px;
    font-size: 16px;
    color: $primaryGray;
    margin-bottom: 0rem;
  }
}
</style>
