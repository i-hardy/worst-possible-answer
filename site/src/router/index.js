import VueRouter from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import Game from '@/views/game/Game';
import GameSetup from '@/views/game/GameSetup.vue';
import Waiting from '@/views/game/Waiting.vue';

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
      component: Game,
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
