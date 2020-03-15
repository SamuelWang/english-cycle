import VueRouter from 'vue-router';
import Index from './components/page/Index.vue';

const routes = [
  { path: '/', component: Index }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;