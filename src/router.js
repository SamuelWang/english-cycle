import VueRouter from 'vue-router';
import Index from './pages/Index.vue';
import Login from './pages/Login.vue';
import Portal from './pages/Portal.vue';
import CycleList from './pages/cycles/CycleList.vue';
import VocabularyEditor from './pages/cycles/VocabularyEditor.vue';
import VocabularyReview from './pages/cycles/VocabularyReview.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login },
  { path: '/portal', component: Portal },
  { path: '/cycles', component: CycleList },
  { path: '/cycles/edit-vocabulary/:id?', component: VocabularyEditor },
  { path: '/cycles/review-vocabulary/:id', component: VocabularyReview },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
