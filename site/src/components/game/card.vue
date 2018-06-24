<template>
  <v-card
    :class="{ 'game-card__playable' : playable, 'game-card__selected' : selected }"
    class="mx-2 game-card"
    @click.native="select">
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
    playable: {
      type: Boolean,
      default: false,
    },
    selected: {
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
    select() {
      if (this.playable) {
        this.$emit('picked', this.card);
      }
    }
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
  font-size: 0.9rem;
  &__playable {
    cursor: pointer;
  }
  &__selected {
    border: 2px solid $primary-red;
    border-radius: 2px;
  }
}
</style>
