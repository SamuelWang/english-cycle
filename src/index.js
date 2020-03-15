import Vue from 'Vue';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import router from './router';
import store from './store';

Vue.use(VueRouter);

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