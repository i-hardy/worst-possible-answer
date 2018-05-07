import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import router from './router';
import store from './store';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VueSocketio, io('http://localhost:3000'), store);

(() =>
  new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
  })
)();
