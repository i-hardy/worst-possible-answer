// require('dotenv').config();

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueChatScroll from 'vue-chat-scroll';
import router from './router';
import store from './store';
import App from './App.vue';

const socketPoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/';

Vue.use(VueRouter);
Vue.use(Vuetify, {
  theme: {
    primary: '#CB1818',
    secondary: '#54BAC3',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
});
Vue.use(VueSocketio, io(socketPoint), store);
Vue.use(VueChatScroll);

(() =>
  new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
  })
)();
