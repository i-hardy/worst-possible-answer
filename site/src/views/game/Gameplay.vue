<template>
  <div class="full-height full-width">
    <div class="game-view">
      <winner v-if="winner" />
      <card-table v-else />
      <pop-up>
        <round-winner v-if="roundEnded" />
      </pop-up>
    </div>
    <hand v-if="!winner" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PopUp from '@/components/transitions/popUp';
import Hand from '@/components/game/hand';
import CardTable from '@/components/game/cardTable';
import RoundWinner from '@/components/game/roundWinner';
import Winner from '@/components/game/winner';

export default {
  name: 'Gameplay',
  components: {
    PopUp,
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
