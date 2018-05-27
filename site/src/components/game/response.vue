<template>
  <section
    :class="{ 'response--pickable' : pickable }"
    class="response"
    @dblclick="czarPick">
    <card
      v-for="(card, index) in response.cards"
      :key="index"
      :card="card"
      :playerID="response.playerID" />
  </section>
</template>

<script>
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
    }
  },
  methods: {
    czarPick() {
      if (this.pickable) {
        this.$socket.emit('czar_pick', {
          playerID: this.response.playerID,
        });
      }
    },
  }
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
}
</style>
