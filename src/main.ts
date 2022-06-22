import { createApp } from 'vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './scss/app.scss';

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
