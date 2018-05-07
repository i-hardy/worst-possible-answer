import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import router from './router';
import App from './App.vue';

Vue.use(VueRouter);
Vue.use(Vuetify);

(() =>
  new Vue({
    el: '#app',
    router,
    render: h => h(App),
  })
)();
