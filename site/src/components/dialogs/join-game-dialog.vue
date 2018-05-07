<template>
  <section>
    <v-dialog max-width="500px">
      <v-btn color="primary" slot="activator">
        Join a Game
      </v-btn>
      <v-card>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="joinGame">
        <v-text-field
          v-model="playerName"
          label="Your nickname"
          :rules="[v => !!v || 'You need to enter a name!']"
          required
        ></v-text-field>
        <v-text-field
          v-model="gameCode"
          label="Enter the game code"
          :rules="[v => !!v || 'You need to enter a game code!']"
          required
        ></v-text-field>
        <v-btn :disabled="!valid" @click="joinGame" color="primary">Join Game</v-btn>
      </v-form>
      </v-card-text>
    </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  name: 'join-game-dialog',
  data() {
    return {
      valid: false,
      playerName: '',
      gameCode: '',
    }
  },
  methods: {
    joinGame() {
      alert(this.playerName);
    }
  }
}
</script>

<style>

</style>
