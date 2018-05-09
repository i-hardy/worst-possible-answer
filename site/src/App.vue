<template>
  <div id="app">
    <router-view />
    <v-footer fixed>
      <span class="mx-2">
        &copy; 2018
      </span>
      <a href="https://github.com/i-hardy/worst-possible-answer">
        <v-icon small>mdi-github-circle</v-icon>
      </a>
      <span class="mx-2">
        Made with <a href="https://vuejs.org/">VueJS</a>
      </span>
    </v-footer>
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style lang="scss">
@import './assets/scss/imports';

footer {
  font-size: 0.9rem;
  display: flex;
  justify-content: flex-end;
}


</style>
