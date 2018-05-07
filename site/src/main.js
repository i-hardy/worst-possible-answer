import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import router from './router';
import store from './store';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(Vuetify);

(() =>
  new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
  })
)();
