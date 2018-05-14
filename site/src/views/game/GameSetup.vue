<template>
  <section>
    <h1 class="hero-text">Select your decks</h1>
    <shareables
      :link="'https://bit.ly/2KJMnBP'"
      :code="gameID" />
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
    <deck-list
      :decks="decks"
      @remove-deck="removeDeck" />
    <section class="mx-auto one-third">
      <v-text-field
        v-model="winCondition"
        label="Points to win"
      />
      <v-btn
        :disabled="!gameReady"
        color="primary"
        block
        @click="startGame">
        Start Game
      </v-btn>
    </section>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
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
      winCondition: '',
    };
  },
  computed: {
    ...mapState({
      gameID: state => state.game.gameID,
    }),
    gameReady() {
      return this.decks.length && !!this.winCondition;
    },
  },
  methods: {
    ...mapMutations(['SEND_TOAST']),
    async addDeck() {
      if (!this.newDeckId) return;
      this.loadingDeck = true;
      try {
        const response = await http.post(`/${this.gameID}/deck/${this.newDeckId}`);
        const { deckID, deckName, deckDesc } = response.data;
        this.newDeckId = '';
        this.decks.push({ deckID, deckName, deckDesc });
        this.$socket.emit('deck_added', { deckName });
      } catch (error) {
        this.SEND_TOAST('An error occurred. Please try again.');
      }
      this.loadingDeck = false;
    },
    async startGame() {
      await http.post(`/${this.gameID}/start`, { winCondition: this.winCondition });
      this.$socket.emit('game_start');
    },
    async removeDeck(deck) {
      await http.post(`/${this.gameID}/deck/${deck.deckID}/remove`);
      this.decks = this.decks.filter(d => d.deckID !== deck.deckID);
      this.$socket.emit('deck_removed', { deckName: deck.deckName });
    },
  },
};
</script>
