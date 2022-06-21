import FooterInfo from '../components/FooterInfo.vue';
import { Meta, StoryFn } from '@storybook/vue3';

export default {
    title: 'Footer',
    component: FooterInfo,
} as Meta<typeof FooterInfo>;

export const Primary: StoryFn<typeof FooterInfo> = () => ({
    components: { FooterInfo },
    template: '<FooterInfo />',
});
