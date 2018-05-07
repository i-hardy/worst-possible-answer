<template>
  <section>
    <v-dialog max-width="500px">
      <v-btn color="primary" slot="activator">
        New Game
      </v-btn>
      <v-card>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="newGame">
        <v-text-field
          v-model="playerName"
          label="Your nickname"
          :rules="[v => !!v || 'You need to enter a name!']"
          required
        ></v-text-field>
        <v-btn :disabled="!valid" @click.stop="newGame" color="primary">Start Game</v-btn>
      </v-form>
      </v-card-text>
    </v-card>
    </v-dialog>
  </section>
</template>

<script>
import http from '../../services/http';

export default {
  name: 'new-game-dialog',
  data() {
    return {
      valid: false,
      playerName: '',
    }
  },
  methods: {
    async newGame() {
      const response = await http.get(`/game/new/${this.playerName}`);
      const { id } = response.data;
      this.$router.push({
        name: 'gameSetup',
        params: {
          gameId: id,
        }
      })
    }
  }
}
</script>

<style>

</style>
