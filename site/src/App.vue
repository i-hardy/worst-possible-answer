<template>
  <div id="app">
    <sidebar v-if="showSidebar"></sidebar>
    <section class="content" :class="{ 'content__with-sidebar' : showSidebar }">
      <router-view style="width:100%"></router-view>
    </section>
  </div>
</template>

<script>
import Sidebar from './components/global/sidebar';

export default {
  name: 'app',
  components: {
    Sidebar
  },
  computed: {
    showSidebar() {
      return this.$route.name !== 'landingPage';
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/imports';

.content {
  width: 100%;
  &__with-sidebar {
    margin-left: $sidebarwidth;
    width: calc(100% - #{$sidebarwidth});
  }
}
</style>
