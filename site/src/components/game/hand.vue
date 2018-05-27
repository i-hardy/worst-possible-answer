<template>
  <div
    :class="{ 'hand__disabled' : disableHand }"
    class="hand unselectable pa-2">
    <div v-if="!isEnded">
      <div
        v-if="ready"
        class="hand-tip__button">
        <v-btn
          color="primary"
          @click="buttonClick">
          {{ buttonText }}
        </v-btn>
      </div>
      <div
        v-else
        class="hand-tip small-text">
          {{ handTip }}
      </div>
    </div>
    <div class="cards-wrapper">
      <card
        v-for="(card, index) in hand"
        :key="index"
        :card="card"
        :selected="selectedCards.includes(card)"
        playable
        @picked="pickCard"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Card from '@/components/game/card';

export default {
  name: 'Hand',
  components: {
    Card,
  },
  data() {
    return {
      selectedCards: [],
    }
  },
  computed: {
    ...mapState({
      hand: state => state.player.hand,
      playerID: state => state.player.id,
      responseCount: state => state.game.round.responseCount,
      czarPick: state => state.game.round.czarPick,
      isEnded: state => state.game.round.isEnded,
    }),
    ...mapGetters(['getPlayerHasPlayed', 'getClientIsCzar']),
    disableHand() {
      return this.getClientIsCzar || this.getPlayerHasPlayed;
    },
    handTip() {
      if (this.getClientIsCzar) return 'You are the card czar! Select the winning response';
      const plural = this.responseCount === 1 ? 'card' : 'cards';
      return `Select ${this.responseCount} ${plural}`;
    },
    buttonText() {
      const plural = this.responseCount === 1 ? 'card' : 'cards';
      if (this.getClientIsCzar) return `Pick selected ${plural}`;
      return `Play selected ${plural}`;
    },
    ready() {
      if (this.getClientIsCzar) return !!this.czarPick;
      return this.selectedCards.length === this.responseCount;
    }
  },
  methods: {
    ...mapMutations(['RESPONSE_PLAYED', 'PLAYER_PLAYED_RESPONSE']),
    preventOverflow() {
      if (this.ready) {
        this.selectedCards.shift();
      }
    },
    pickCard(card) {
      this.preventOverflow();
      if (this.selectedCards.includes(card)) {
        this.selectedCards = this.selectedCards.filter(c => c !== card);
      } else {
        this.selectedCards.push(card);
      }
    },
    playResponse() {
      this.$socket.emit('play_card', {
        playerID: this.playerID,
        cards: this.selectedCards,
      });
      this.PLAYER_PLAYED_RESPONSE({
        playerID: this.playerID,
        cards: this.selectedCards,
      });
      this.selectedCards.forEach(card => {
        this.RESPONSE_PLAYED(card);
      });
    },
    sendCzarPick() {
      this.$socket.emit('czar_pick', {
        playerID: this.czarPick.playerID,
      });
    },
    buttonClick() {
      if (this.getClientIsCzar && this.czarPick) {
        this.sendCzarPick();
      } else {
        this.playResponse();
      }
    },
  },
  watch: {
    hand() {
      this.selectedCards = [];
    }
  }
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

.hand-tip__button {
  position: absolute;
  top: -4rem;
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
