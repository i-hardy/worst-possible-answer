import VueRouter from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import GameSetup from '../views/GameSetup.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage,
    },
    {
      path: '/setup/:gameId',
      name: 'gameSetup',
      component: GameSetup,
    },
  ],
});

export { router as default };
