import VueRouter from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import Game from '@/views/game/Game';
import GameSetup from '@/views/game/GameSetup.vue';
import Gameplay from '@/views/game/Gameplay.vue';
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
        {
          path: 'play',
          name: 'play',
          component: Gameplay,
        },
      ],
    },
  ],
});

export { router as default };
