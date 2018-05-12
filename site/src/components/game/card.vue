<template>
  <v-card
    :class="{ 'game-card__playable' : playable }"
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
  },
  computed: {
    text() {
      return this.card.text.join();
    },
  },
  methods: {
    ...mapMutations(['CARD_PLAYED', 'PLAYER_PLAYED_CARD']),
    play() {
      if (this.playable) {
        this.$socket.emit('play_card', {
          playerID: this.playerID,
          cardID: this.card.id,
        });
        this.CARD_PLAYED(this.card);
        this.PLAYER_PLAYED_CARD(this.card);
      }
    },
  },
};
</script>

<style lang="scss">
.game-card {
  width: 100%;
  height: 90%;
  text-align: left;
  border-radius: 2px;
  &__playable {
    cursor: pointer;
  }
}
</style>
