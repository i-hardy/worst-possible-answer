<template>
  <div
    id="app"
    class="full-height">
    <router-view />
    <v-footer
      v-if="showFooter"
      fixed
      height="6rem">
      <div class="footer-content">
        <v-breadcrumbs
          divider="-"
          justify-center>
          <v-breadcrumbs-item
            v-for="(breadcrumb, index) in breadcrumbs"
            :key="index"
            :to="breadcrumb.routeName">
            {{ breadcrumb.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
        <div>
          <span class="mx-2">
            &copy; 2018
          </span>
          <a href="https://github.com/i-hardy/worst-possible-answer">
            <v-icon small>mdi-github-circle</v-icon>
          </a>
          <span class="mx-2">
            Made with <a href="https://vuejs.org/">VueJS</a>
          </span>
        </div>
      </div>
    </v-footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      breadcrumbs: [
        {
          routeName: 'about',
          text: 'About',
        },
        {
          routeName: 'privacy',
          text: 'Privacy',
        },
        {
          routeName: 'tutorial',
          text: 'How to Play',
        },
      ],
    };
  },
  computed: {
    showFooter() {
      return !this.$route.path.includes('game');
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/imports';

.footer-content {
  width: 100%;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.breadcrumbs li:last-child a {
  cursor: pointer;
  pointer-events: all;
}
</style>
