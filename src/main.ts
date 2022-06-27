import { createApp, App as VueApp } from 'vue';
import VueGtag from 'vue-gtag-next';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'intro.js/introjs.css';

import './scss/app.scss';
import './scss/introjs.scss';

import App from './App.vue';
import router from './router';
import store from './store';

import * as fb from './config/fbConfig';
import { registerGateKeeper } from './featuredFlags';

let app: VueApp | undefined;
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    // Enable Google analytics with custom events
    app.use(VueGtag, {
      property: { id: 'UA-124837875-2' },
    });
    app.use(store);
    app.mount('#app');
  }
});

registerGateKeeper();
