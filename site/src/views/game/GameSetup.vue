<template>
  <section>
    <h1 class="hero-text">Select your decks</h1>
    <!-- <shareables
      :link="'https://bit.ly/2KJMnBP'"
      :code="gameID" /> -->
    <section class="py-3">
      Enter deck IDs from <a href="https://www.cardcastgame.com/">Cardcast</a>.
    </section>
    <section class="mx-auto one-third">
      <v-form
        class="flex flex-acenter"
        @submit.prevent="addDeck">
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
    <deck-list :decks="decks" />
    <section class="mx-auto one-third">
      <v-btn
        :disabled="!decks.length"
        color="primary"
        block>
        Start Game
      </v-btn>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import http from '@/services/http';
import Shareables from '@/components/admin/shareables';
import DeckList from '@/components/admin/deckList';

export default {
  name: 'GameSetup',
  components: {
    Shareables,
    DeckList,
  },
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
      if (!this.newDeckId) return;
      this.loadingDeck = true;
      try {
        const response = await http.post(`/${this.gameID}/deck/${this.newDeckId}`);
        const { deckName, deckDesc } = response.data;
        this.newDeckId = '';
        this.decks.push({ deckName, deckDesc });
        this.$socket.emit('deck_added', { deckName });
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
