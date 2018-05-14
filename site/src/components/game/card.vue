<template>
  <v-card
    :class="{ 'game-card__playable' : playable || pickable, 'game-card__winning' : isWinner }"
    class="mx-2 game-card"
    @dblclick.left="play">
    <v-card-text>
      {{ text }}
    </v-card-text>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      required: true,
    },
    playerID: {
      type: String,
      required: true,
    },
    playable: {
      type: Boolean,
      default: false,
    },
    pickable: {
      type: Boolean,
      default: false,
    },
    isWinner: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    text() {
      return this.card.text.join();
    },
  },
  methods: {
    ...mapMutations(['CARD_PLAYED', 'PLAYER_PLAYED_CARD']),
    playerPlay() {
      this.$socket.emit('play_card', {
        playerID: this.playerID,
        cardID: this.card.id,
      });
      this.CARD_PLAYED(this.card);
      this.PLAYER_PLAYED_CARD({
        playerID: this.playerID,
        card: this.card,
      });
    },
    czarPick() {
      this.$socket.emit('czar_pick', {
        playerID: this.playerID,
        cardID: this.card.id,
      });
    },
    play() {
      if (this.playable) {
        this.playerPlay();
      } else if (this.pickable) {
        this.czarPick();
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.game-card {
  width: 100%;
  height: 90%;
  text-align: left;
  border-radius: 2px;
  &__playable {
    cursor: pointer;
  }
  &__winning {
    border: 2px solid $primary-red;
    border-radius: 2px;
  }
}
</style>
