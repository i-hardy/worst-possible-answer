<template>
  <v-list-tile-avatar :tile="true">
    <v-badge
      overlap
      left>
      <span
        v-if="hasCrown"
        slot="badge"
        class="icon__czar-badge">
        <svg
          style="width:24px;height:24px"
          viewBox="0 0 24 24">
          <path
            d="M5,16L3,5L8.5,12L12,5L15.5,12L21,5L19,16H5M19,19A1,
                      1 0 0,1 18,20H6A1,1 0 0,1 5,19V18H19V19Z" />
        </svg>
      </span>
      <img
        :src="icon"
        :title="player.icon"
        style="height:32px">
    </v-badge>
  </v-list-tile-avatar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PlayerIcon',
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      czar: state => state.game.round.czar,
    }),
    hasCrown() {
      return this.player.id === this.czar;
    },
    icon() {
      /* eslint-disable */
      return require(`../../../assets/images/playerIcons/${this.player.icon}.svg`);
    },
  },
};
</script>

<style lang="scss">
@import '../../../assets/scss/variables';

.icon__czar-badge {
  transform: rotate(-45deg);
  & svg {
    fill: $primary-red;
  }
}
</style>
