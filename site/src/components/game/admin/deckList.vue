<template>
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
</template>

<script>
export default {
  name: 'DeckList',
  props: {
    decks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeDeck(deck) {
      this.$emit('remove-deck', deck);
    },
  },
};
</script>

<style>

</style>
