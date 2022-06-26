<template>
  <div class="onboarding">
    <div class="onboarding-section">
      <div class="onboarding-subHeader onboarding-subHeader--indent">
        <span class="onboarding-subHeader--font"> Your Name</span>
      </div>
      <div class="onboarding-inputs onboarding-inputs--name">
        <div class="onboarding-inputWrapper onboarding-inputWrapper--name">
          <label class="onboarding-label"><span class="onboarding-subHeader--font">First Name<span
                class="onboarding-required-star">*</span>
            </span></label>
          <input class="onboarding-input" v-model="firstName" @input="updateBasic()" />
        </div>
        <div class="onboarding-inputWrapper onboarding-inputWrapper--name">
          <label class="onboarding-label"><span class="onboarding-subHeader--font">Middle Name</span></label>
          <input class="onboarding-input" v-model="middleName" @input="updateBasic()" />
        </div>
        <div class="onboarding-inputWrapper onboarding-inputWrapper--name">
          <label class="onboarding-label"><span class="onboarding-subHeader--font">Last Name<span
                class="onboarding-required-star">*</span>
            </span></label>
          <input class="onboarding-input" v-model="lastName" @input="updateBasic()" />
        </div>
        <div class="onboarding-inputWrapper onboarding-inputWrapper--name onboarding-inputWrapper--description">
          <label class="onboarding-label"><span class="onboarding-subHeader--font">Entrance Season<span
                class="onboarding-required-star">*</span>
            </span></label>
          <div class="onboarding-selectWrapper">
            <onboarding-basic-single-dropdown :availableChoices="seasons" :correspondingImages="seasonImgs"
              :choice="entranceSemChoice" :cannotBeRemoved="true" @on-select="selectEntranceSem" />
          </div>
        </div>
        <div class="onboarding-inputWrapper onboarding-inputWrapper--name">
          <label class="onboarding-label"><span class="onboarding-subHeader--font">Entrance Year<span
                class="onboarding-required-star">*</span>
            </span></label>
          <div class="onboarding-selectWrapper">
            <onboarding-basic-single-dropdown :availableChoices="entranceYears" :choice="entranceYear"
              :cannotBeRemoved="true" :scrollBottomToElement="suggestedEntranceSem" @on-select="selectEntranceYear" />
          </div>
        </div>
        <div class="onboarding-inputWrapper onboarding-inputWrapper--name"></div>
        <div class="onboarding-inputWrapper onboarding-inputWrapper--name">
          <label class="onboarding-label"><span class="onboarding-subHeader--font">Graduation Season<span
                class="onboarding-required-star">*</span>
            </span></label>
          <div class="onboarding-selectWrapper">
            <onboarding-basic-single-dropdown :availableChoices="seasons" :correspondingImages="seasonImgs"
              :choice="gradSemChoice" :cannotBeRemoved="true" @on-select="selectGraduationSem" />
          </div>
        </div>
        <div class="onboarding-inputWrapper onboarding-inputWrapper--name">
          <label class="onboarding-label"><span class="onboarding-subHeader--font">Graduation Year<span
                class="onboarding-required-star">*</span>
            </span></label>
          <div class="onboarding-selectWrapper">
            <onboarding-basic-single-dropdown :availableChoices="gradYears" :choice="gradYear" :cannotBeRemoved="true"
              :scrollBottomToElement="suggestedGradSem" @on-select="selectGraduationYear" />
          </div>
        </div>
      </div>
    </div>
    <div class="onboarding-section">
      <div class="onboarding-subHeader onboarding-subHeader--indent">
        <span class="onboarding-subHeader--font">Undergraduate Degree</span>
      </div>
      <div class="onboarding-inputs onboarding-inputs--undergrad">
        <div class="onboarding-section">
          <!-- TODO: Multiple colleges -->
          <div class="onboarding-subHeader">
            <span class="onboarding-subHeader--font">Your Major</span>
          </div>
          <div class="onboarding-inputs onboarding-inputs--small">
            <div class="onboarding-inputWrapper onboarding-inputWrapper--college">
              <label class="onboarding-label">College</label>
              <div class="onboarding-selectWrapper">
                <onboarding-basic-single-dropdown :availableChoices="colleges" :choice="collegeAcronym"
                  :cannotBeRemoved="collegeAcronym.length <= 0" @on-select="selectCollege" @on-remove="removeCollege" />
              </div>
            </div>
            <div class="onboarding-inputWrapper onboarding-inputWrapper--college">
              <label class="onboarding-label">Major</label>
              <onboarding-basic-multi-dropdown :availableChoices="majors" :dropdownChoices="majorAcronyms"
                add-dropdown-text="+ another major" @on-select="selectMajor" @on-remove="removeMajor"
                @on-add="addMajor" />
              <div class="requestForm">
                *Don't see your major/minor? We are working hard to add them soon! Get updated when
                we add it by signing up
                <a href="https://forms.gle/MDvVDoRapUp2VeBb9" target="_blank" class="link">here</a>
              </div>
            </div>
          </div>
          <div class="onboarding-subHeader">
            <span class="onboarding-subHeader--font">Your Minor</span>
          </div>
          <div class="onboarding-inputs onboarding-inputs--small">
            <div class="onboarding-inputWrapper">
              <label class="onboarding-label">Minor</label>
              <onboarding-basic-multi-dropdown :availableChoices="minors" :dropdownChoices="minorAcronyms"
                add-dropdown-text="+ another minor" @on-select="selectMinor" @on-remove="removeMinor"
                @on-add="addMinor" />
            </div>
          </div>
          <div class="onboarding-subHeader">
            <span class="onboarding-subHeader--font">Pre-Professional Program</span>
          </div>
          <div class="onboarding-inputs onboarding-inputs--small">
            <div class="onboarding-inputWrapper">
              <label class="onboarding-label">Program</label>
              <onboarding-basic-multi-dropdown :availableChoices="prePrograms" :dropdownChoices="preProgramAcronyms"
                add-dropdown-text="+ another pre-professional program" @on-select="selectPreProgram"
                @on-remove="removePreProgram" @on-add="addPreProgram" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="onboarding-section">
      <div class="onboarding-subHeader onboarding-subHeader--indent">
        <span class="onboarding-subHeader--font">Graduate Degree</span>
      </div>
      <div class="onboarding-inputs">
        <div class="onboarding-inputWrapper">
          <label class="onboarding-label">Program</label>
          <onboarding-basic-single-dropdown :availableChoices="prePrograms" :choice="preProgramAcronym"
            :cannotBeRemoved="gradAcronym.length <= 0" @on-select="selectGrad" @on-remove="removePreProgram" />
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import reqsData from '@/requirements/typedRequirementJson';
import {
  clickOutside,
  getCurrentYear,
  getCollegeFullName,
  computeGradYears,
  computeEntranceYears,
} from '@/utilities';
import OnboardingBasicMultiDropdown from './OnboardingBasicMultiDropdown.vue';
import OnboardingBasicSingleDropdown from './OnboardingBasicSingleDropdown.vue';

import fall from '@/assets/images/fallEmoji.svg';
import spring from '@/assets/images/springEmoji.svg';
import summer from '@/assets/images/summerEmoji.svg';

const placeholderText = 'Select one';

export default defineComponent({
  components: { OnboardingBasicMultiDropdown, OnboardingBasicSingleDropdown },
  props: {
    userName: { type: Object as PropType<FirestoreUserName>, required: true },
    onboardingData: {
      type: Object as PropType<AppOnboardingData>,
      required: true,
    },
    isEditingProfile: { type: Boolean, required: true },
  },
  emits: {
    updateBasic(
      gradYear: string,
      gradSem: FirestoreSemesterSeason,
      entranceYear: string,
      entranceSem: FirestoreSemesterSeason,
      collegeAcronym: string,
      majorAcronyms: readonly string[],
      minorAcronyms: readonly string[],
      preProgramAcronyms: readonly string[],
      name: FirestoreUserName
    ) {
      return (
        typeof gradYear === 'string' &&
        typeof gradSem === 'string' &&
        typeof entranceYear === 'string' &&
        typeof entranceSem === 'string' &&
        typeof collegeAcronym === 'string' &&
        Array.isArray(majorAcronyms) &&
        Array.isArray(minorAcronyms) &&
        Array.isArray(preProgramAcronyms) &&
        typeof name === 'object'
      );
    },
  },
  data() {
    const majorAcronyms = [...this.onboardingData.major];
    const minorAcronyms = [...this.onboardingData.minor];
    const preProgramAcronyms = [...this.onboardingData.preProgram];
    if (majorAcronyms.length === 0) majorAcronyms.push('');
    if (minorAcronyms.length === 0) minorAcronyms.push('');
    if (preProgramAcronyms.length === 0) preProgramAcronyms.push('');

    // convert AS1/AS2 acronym in firebase to AS for the frontend
    let collegeAcronym = this.onboardingData.college ?? '';
    if (collegeAcronym === 'AS1' || collegeAcronym === 'AS2') {
      collegeAcronym = 'AS';
    }

    // if sem has not been previously filled out, choice is automatically is "Fall"/"Spring" for new users, old users have no data
    let { gradSem } = this.onboardingData;
    let { entranceSem } = this.onboardingData;
    if (!this.isEditingProfile) {
      gradSem = gradSem !== '' ? gradSem : 'Spring';
      entranceSem = entranceSem !== '' ? entranceSem : 'Fall';
    }

    return {
      firstName: this.userName.firstName,
      middleName: this.userName.middleName,
      lastName: this.userName.lastName,
      placeholderText,
      gradYear: this.onboardingData.gradYear,
      gradSem,
      entranceYear: this.onboardingData.entranceYear,
      entranceSem,
      collegeAcronym,
      majorAcronyms,
      minorAcronyms,
      preProgramAcronyms,
    };
  },
  directives: {
    'click-outside': clickOutside,
  },
  computed: {
    entranceYears: computeEntranceYears,
    gradYears(): Readonly<Record<string, string>> {
      return computeGradYears(this.entranceYear);
    },
    colleges(): Readonly<Record<string, string>> {
      const base = Object.entries(reqsData.college)
        .filter(college => !college[0].startsWith('AS'))
        .map(([key, { name }]) => [key, name]);
      base.push(['AS', getCollegeFullName('AS')]);
      base.sort((c1, c2) => c1[1].localeCompare(c2[1]));
      return Object.fromEntries(base);
    },
    majors(): Readonly<Record<string, string>> {
      const majors: Record<string, string> = {};
      const majorJSON = reqsData.major;
      const acr = this.collegeAcronym !== 'AS' ? this.collegeAcronym : 'AS2';
      Object.keys(majorJSON).forEach(key => {
        // only show majors for schools the user is in
        if (majorJSON[key].schools.includes(acr)) {
          majors[key] = majorJSON[key].name;
        }
      });
      return majors;
    },
    minors(): Readonly<Record<string, string>> {
      const minors: Record<string, string> = {};
      const minorJSON = reqsData.minor;
      Object.keys(minorJSON).forEach(key => {
        // show no minors if the user is not in a college
        if (this.collegeAcronym) {
          minors[key] = minorJSON[key].name;
        }
      });
      return minors;
    },

    prePrograms(): Readonly<Record<string, string>> {
      const prePrograms: Record<string, string> = {};
      const preProgramJSON = reqsData.minor;
      Object.keys(preProgramJSON).forEach(key => {
        // show no minors if the user is not in a college
        if (this.collegeAcronym) {
          prePrograms[key] = preProgramJSON[key].name;
        }
      });
      return prePrograms;
    },

    suggestedEntranceSem(): Readonly<number> {
      return getCurrentYear();
    },
    suggestedGradSem(): Readonly<number> {
      return parseInt(this.entranceYear, 10) + 4;
    },
    seasons(): Readonly<Record<string, string>> {
      return {
        Fall: 'Fall',
        Spring: 'Spring',
        Summer: 'Summer',
        Winter: 'Winter',
      };
    },
    seasonImgs(): Readonly<Record<FirestoreSemesterSeason, string>> {
      return {
        Fall: fall,
        Spring: spring,
        Summer: summer,
      };
    },
    gradSemChoice(): string {
      return this.gradSem as string;
    },
    entranceSemChoice(): string {
      return this.entranceSem as string;
    },
  },
  methods: {
    updateBasic() {
      this.$emit(
        'updateBasic',
        this.gradYear,
        this.gradSem,
        this.entranceYear,
        this.entranceSem,
        this.collegeAcronym,
        this.majorAcronyms.filter(it => it !== ''),
        this.minorAcronyms.filter(it => it !== ''),
        this.preProgramAcronyms.filter(it => it !== ''),

        {
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
        }
      );
    },
    // Clear a major if a new college is selected and the major is not in it
    clearMajorIfNotInCollege() {
      const majorJSON = reqsData.major;
      for (let x = 0; x < this.majorAcronyms.length; x += 1) {
        const majorAcronym = this.majorAcronyms[x];
        let foundCollege = false;
        // Do nothing if no major set
        if (majorAcronym !== '') {
          if (majorJSON[majorAcronym].schools.includes(this.collegeAcronym)) {
            foundCollege = true;
          }
        }
        if (!foundCollege) {
          this.majorAcronyms[x] = '';
        }
      }
    },
    // Clear graduation year if a new entrance year is selected and the graduation year is no longer in the dropdown
    clearGradYearIfIllegal() {
      const gradYear = parseInt(this.gradYear, 10);
      if (!(gradYear in computeGradYears(this.entranceYear))) {
        this.gradYear = '';
      }
    },
    selectGraduationYear(year: string) {
      this.gradYear = year;
      this.updateBasic();
    },
    selectEntranceYear(year: string) {
      this.entranceYear = year;
      this.clearGradYearIfIllegal();
      this.updateBasic();
    },
    selectGraduationSem(season: string) {
      this.gradSem = season as FirestoreSemesterSeason;
      this.updateBasic();
    },
    selectEntranceSem(season: string) {
      this.entranceSem = season as FirestoreSemesterSeason;
      this.updateBasic();
    },
    selectCollege(acronym: string) {
      this.collegeAcronym = acronym;
      this.clearMajorIfNotInCollege();
      this.updateBasic();
    },
    selectMajor(acronym: string, i: number) {
      this.majorAcronyms = this.majorAcronyms.map((dropdown, index) =>
        index === i ? acronym : dropdown
      );
      this.updateBasic();
    },
    selectMinor(acronym: string, i: number) {
      this.minorAcronyms = this.minorAcronyms.map((dropdown, index) =>
        index === i ? acronym : dropdown
      );
      this.updateBasic();
    },
    selectPreProgram(acronym: string, i: number) {
      this.preProgramAcronyms = this.preProgramAcronyms.map((dropdown, index) =>
        index === i ? acronym : dropdown
      );
      this.updateBasic();
    },
    // remove college and all current majors
    removeCollege() {
      this.collegeAcronym = '';
      this.majorAcronyms = [''];
      this.minorAcronyms = [''];
      this.preProgramAcronyms = [''];
      this.updateBasic();
    },
    removeMajor(index: number) {
      this.majorAcronyms.splice(index, 1);
      if (this.majorAcronyms.length === 0) {
        this.addMajor();
      }
      this.updateBasic();
    },
    removeMinor(index: number) {
      this.minorAcronyms.splice(index, 1);
      if (this.minorAcronyms.length === 0) {
        this.addMinor();
      }
      this.updateBasic();
    },
    removePreProgram(index: number) {
      this.preProgramAcronyms.splice(index, 1);
      if (this.preProgramAcronyms.length === 0) {
        this.addPreProgram();
      }
      this.updateBasic();
    },
    addMajor() {
      this.majorAcronyms.push('');
    },
    addMinor() {
      this.minorAcronyms.push('');
    },
    addPreProgram() {
      this.preProgramAcronyms.push('');
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/components/Modals/Onboarding/Onboarding.scss';
</style>
