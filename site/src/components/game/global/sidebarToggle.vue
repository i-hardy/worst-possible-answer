<template>
  <div class="toggle__wrapper">
    <v-btn
      fab
      small
      right
      color="primary"
      @click="TOGGLE_SIDEBAR">
      <v-icon>keyboard_arrow_left</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'SidebarToggle',
  computed: {
    ...mapState({
      showSidebar: state => state.client.showSidebar,
    }),
  },
  methods: {
    ...mapMutations(['TOGGLE_SIDEBAR']),
  }
};
</script>

<style lang="scss">
@import '../../../assets/scss/imports';

.toggle {
  &__wrapper {
    position: absolute;
    top: 0;
    z-index: 999;
    left: $sidebarwidth;
  }
}
</style>
