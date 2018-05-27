<template>
  <div
    :class="{ 'hand__disabled' : disableHand }"
    class="hand unselectable pa-2">
    <div class="hand-tip small-text">
      {{ handTip }}
    </div>
    <div class="cards-wrapper">
      <card
        v-for="(card, index) in hand"
        :key="index"
        :card="card"
        :playerID="playerID"
        playable />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Card from '@/components/game/card';

export default {
  name: 'Hand',
  components: {
    Card,
  },
  computed: {
    ...mapState({
      hand: state => state.player.hand,
      playerID: state => state.player.id,
    }),
    ...mapGetters(['getPlayerHasPlayed', 'getClientIsCzar']),
    disableHand() {
      return this.getClientIsCzar || this.getPlayerHasPlayed;
    },
    handTip() {
      if (this.getClientIsCzar) return 'You are the card czar!';
      return 'Double click to play a card';
    }
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.hand-tip {
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
}

.hand {
  position: fixed;
  bottom: 0;
  height: 200px;
  width: calc(100% - #{$sidebarwidth});
  background: $background-grey;
  box-shadow: 0 -2px 1px -1px rgba(0,0,0,.2);
  &__disabled .cards-wrapper {
    opacity: 0.5;
    pointer-events: none;
  }
  &__czar-message {
    position: absolute;
    z-index: 99999;
    opacity: 1;
  }
}
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 100%;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  height: 100%;
}
</style>
