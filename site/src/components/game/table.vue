<template>
  <div class="ma-3 game-table">
    <v-card
      dark
      class="call-card">
      <v-card-text>
        {{ callCardText }}
      </v-card-text>
    </v-card>
    <card
      v-for="(playedCard, index) in cardsPlayed"
      :key="index"
      :card="playedCard.card"
      :playerID="playedCard.playerID"
      :pickable="getClientIsCzar" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Card from '@/components/game/card';

export default {
  name: 'CardTable',
  components: {
    Card,
  },
  computed: {
    ...mapState({
      callCard: state => state.game.round.callCard,
      cardsPlayed: state => state.game.round.cardsPlayed,
      roundWinner: state => state.game.round.winner,
    }),
    ...mapGetters(['getClientIsCzar']),
    callCardText() {
      return this.callCard.text.join('___');
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.game-table {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 200px);
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
}

.call-card {
  background: $black;
  text-align: left;
}
</style>
