<template>
  <section
    :class="{ 'response--pickable' : pickable, 'response--winner' : isWinner }"
    class="response"
    @click="czarPick">
    <card
      v-for="(card, index) in response.cards"
      :key="index"
      :card="card"
      :playerID="response.playerID" />
  </section>
</template>

<script>
import { mapMutations } from 'vuex';
import Card from '@/components/game/card';

export default {
  name: 'Response',
  components: {
    Card,
  },
  props: {
    response: {
      type: Object,
      required: true,
    },
    pickable: {
      type: Boolean,
      default: false,
    },
    isWinner: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    ...mapMutations(['SET_CZAR_PICK']),
    czarPick() {
      if (this.pickable) {
        this.SET_CZAR_PICK(this.response);
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.response {
  border: 1px solid $root-text;
  display: flex;
  flex-direction: column;
  & > * {
    margin-right: 0 !important;
    margin-left: 0 !important;
    height: 100% !important;
    &:not(:first-of-type) {
      margin-top: 0.5rem;
    }
  }
  &--pickable {
    cursor: pointer;
    pointer-events: all;
  }
  &--winner {
    border-color: $primary-red;
  }
}
</style>
