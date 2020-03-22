import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './components/App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

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