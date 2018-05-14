<template>
  <div class="full-height full-width">
    <div class="game-view">
      <winner v-if="winner" />
      <card-table v-else />
      <round-winner v-if="roundEnded" />
    </div>
    <hand />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Hand from '@/components/game/hand';
import CardTable from '@/components/game/cardTable';
import RoundWinner from '@/components/game/roundWinner';
import Winner from '@/components/game/winner';

export default {
  name: 'Gameplay',
  components: {
    Hand,
    CardTable,
    RoundWinner,
    Winner,
  },
  computed: {
    ...mapState({
      winner: state => state.game.winner,
      roundEnded: state => state.game.round.isEnded,
    }),
    ...mapGetters(['getRoundWinner']),
  },
};
</script>

<style lang="scss">

</style>
