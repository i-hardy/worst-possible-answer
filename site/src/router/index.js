import VueRouter from 'vue-router';
import Index from '@/views/Index.vue';
import LandingPage from '@/views/index/LandingPage';
import About from '@/views/index/About';
import Privacy from '@/views/index/Privacy';
import Tutorial from '@/views/index/Tutorial';

import Game from '@/views/Game';
import GameSetup from '@/views/game/GameSetup.vue';
import Gameplay from '@/views/game/Gameplay.vue';
import Waiting from '@/views/game/Waiting.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '',
          name: 'landingPage',
          component: LandingPage,
        },
        {
          path: 'about',
          name: 'about',
          component: About,
        },
        {
          path: 'privacy',
          name: 'privacy',
          component: Privacy,
        },
        {
          path: 'tutorial',
          name: 'howToPlay',
          component: Tutorial,
        },
      ],
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
