<template>
  <section>
    <sidebar />
    <section class="content content__with-sidebar">
      <router-view style="width:100%" />
    </section>
  </section>
</template>

<script>
import Sidebar from '@/components/global/sidebar';

export default {
  name: 'Game',
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.content {
  width: 100%;
  &__with-sidebar {
    margin-left: $sidebarwidth;
    width: calc(100% - #{$sidebarwidth});
  }
}
</style>

