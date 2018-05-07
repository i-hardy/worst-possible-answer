import VueRouter from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import GameSetup from '../views/GameSetup.vue';
import Waiting from '../views/Waiting.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage,
    },
    {
      path: '/game/:gameId',
      component: {
        name: 'GameView',
        template: '<router-view />',
      },
      children: [
        {
          path: 'setup',
          name: 'gameSetup',
          component: GameSetup,
        },
        {
          path: 'waiting',
          name: 'waiting',
          component: Waiting,
        },
      ],
    },
  ],
});

export { router as default };
