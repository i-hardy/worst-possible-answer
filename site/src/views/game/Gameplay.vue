<template>
  <div class="full-height full-width">
    <div class="game-view">
      <round-end v-if="roundEnded" />
      <div v-else-if="winner">
        yo game's over
      </div>
      <card-table v-else />
    </div>
    <hand />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Hand from '@/components/game/hand';
import CardTable from '@/components/game/table';
import RoundEnd from '@/components/game/roundEnd';

export default {
  name: 'Gameplay',
  components: {
    Hand,
    CardTable,
    RoundEnd,
  },
  computed: {
    ...mapState({
      roundEnded: state => state.game.round.isEnded,
      winner: state => state.game.winner,
    }),
    ...mapGetters(['getRoundWinner']),
  },
};
</script>

<style lang="scss">

</style>
