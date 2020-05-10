import VueRouter from 'vue-router';
import Index from './pages/Index.vue';
import Login from './pages/Login.vue';
import Portal from './pages/Portal.vue';
import CycleList from './pages/cycles/CycleList.vue';
import VocabularyEdit from './pages/cycles/VocabularyEdit.vue';
import VocabularyReview from './pages/cycles/VocabularyReview.vue';
import SentenceEdit from './pages/cycles/SentenceEdit.vue';
import SentenceReview from './pages/cycles/SentenceReview.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login },
  { path: '/portal', component: Portal },
  { path: '/cycles', component: CycleList },
  { path: '/cycles/edit-vocabulary/:id?', component: VocabularyEdit },
  { path: '/cycles/review-vocabulary/:id', component: VocabularyReview },
  { path: '/cycles/edit-sentence/:id?', component: SentenceEdit },
  { path: '/cycles/review-sentence/:id', component: SentenceReview },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
