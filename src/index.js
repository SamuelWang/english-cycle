import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './components/App.vue';
import router from './router';
import store from './store';
import appSettings from './../app-settings';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import Firebase
import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

initFirebase();
initAppNode();

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});

function initAppNode() {
  const appNode = document.createElement('div');
  appNode.id = 'app';
  appNode.innerHTML = '<app><app>';
  document.body.appendChild(appNode);
}

function initFirebase() {
  const firebaseConfig = {
    apiKey: appSettings.firebase.apiKey,
    authDomain: appSettings.firebase.authDomain,
    databaseURL: appSettings.firebase.databaseURL,
    projectId: appSettings.projectId,
    appId: appSettings.firebase.appId
  };

  firebase.initializeApp(firebaseConfig);
}
