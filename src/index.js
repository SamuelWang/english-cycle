import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueQuillEditor from 'vue-quill-editor';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// Import Firebase
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import App from './components/App.vue';
import router from './router';
import store from './store';
import './validation';
import appSettings from './../app-settings';
import EcService from './plugins/Service';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueQuillEditor, {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'link'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  },
});
Vue.use(IconsPlugin);
Vue.use(EcService);

initFirebase();
initAppNode();

const app = new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  store,
});

app.$store.dispatch('setInitialPath', app.$route.path);

// Try to use previous credential to login again.
signInUserWithCredential();

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
    projectId: appSettings.firebase.projectId,
    appId: appSettings.firebase.appId,
  };

  firebase.initializeApp(firebaseConfig);
}

function signInUserWithCredential() {
  let credential = app.$services().getCredential();

  if (credential) {
    app.$router.replace('/');

    firebase
      .auth()
      .signInWithCredential(credential)
      .then((userCredential) => {
        app
          .$services()
          .signedInHandler(userCredential)
          .then(() => {
            let initialPath = app.$store.state.initialPath;

            if (initialPath && initialPath !== '/') {
              app.$router.push(initialPath);
            } else {
              app.$router.push('/portal');
            }
          })
          .catch((error) => {
            console.error(`Signing in user with credential failed.
            Error Code: ${error.code}
            Error Message: ${error.message}`);
          });
      })
      .catch((error) => {
        console.error(`Signing in user with credential failed.
        Error Code: ${error.code}
        Error Message: ${error.message}`);

        if (error.code === 'auth/invalid-credential') {
          app.$services().signOut();
        }
      });
  }
}
