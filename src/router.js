import VueRouter from 'vue-router';
import Index from './pages/Index.vue';
import Login from './pages/Login.vue';
import Portal from './pages/Portal.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login },
  { path: '/portal', component: Portal }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
