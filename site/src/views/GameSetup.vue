<template>
  <section>
    <h1 class="hero-text">Select your decks</h1>
    <section class="py-3">
      Enter deck IDs from <a href="https://www.cardcastgame.com/">Cardcast</a>.
    </section>
    <section class="mx-auto one-third">
      <v-form
        class="flex flex-acenter"
        @submit.prevent>
        <v-text-field
          v-model="newDeckId"
          label="Deck ID"
        />
        <v-btn
          :disabled="!newDeckId"
          color="primary"
          @click.stop="addDeck">
          Add deck
          <v-progress-circular
            v-show="loadingDeck"
            :indeterminate="true"
            :width="2"
            size="12"
            class="ml-2" />
        </v-btn>
      </v-form>
    </section>
    <v-list
      two-line
      class="mx-auto two-thirds">
      <template v-for="(deck, index) in decks">
        <v-list-tile :key="index">
          <v-list-tile-content>
            <v-list-tile-title v-html="deck.deckName" />
            <v-list-tile-sub-title v-html="deck.deckDesc" />
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn
              icon
              ripple
              @click="removeDeck(deck)">
              <v-icon color="grey lighten-1">close</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import http from '../services/http';

export default {
  name: 'GameSetup',
  data() {
    return {
      newDeckId: '',
      loadingDeck: false,
      decks: [],
    };
  },
  computed: {
    ...mapState(['gameID']),
  },
  methods: {
    async addDeck() {
      this.loadingDeck = true;
      try {
        const response = await http.post(`/${this.gameID}/deck/${this.newDeckId}`);
        const { deckName, deckDesc } = response.data;
        this.newDeckId = '';
        this.decks.push({ deckName, deckDesc });
      } catch (error) {
        console.log('whoops');
      }
      this.loadingDeck = false;
    },
    removeDeck(deck) {
      console.log(deck);
    },
  },
};
</script>

<style>
.one-third {
  width: 33%;
}

.two-thirds {
  width: 66%;
}
</style>
