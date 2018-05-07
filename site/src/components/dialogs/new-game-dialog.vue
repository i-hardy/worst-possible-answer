<template>
  <section>
    <v-dialog max-width="500px">
      <v-btn
        slot="activator"
        color="primary">
        New Game
      </v-btn>
      <v-card>
        <v-card-text>
          <v-form
            v-model="valid"
            @submit.prevent="newGame">
            <v-text-field
              v-model="playerName"
              :rules="[v => !!v || 'You need to enter a name!']"
              autofocus
              label="Your nickname"
              required
            />
            <v-btn
              :disabled="!valid"
              color="primary"
              @click.stop="newGame">Start Game</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import http from '../../services/http';

export default {
  name: 'NewGameDialog',
  data() {
    return {
      valid: false,
      playerName: '',
    };
  },
  methods: {
    async newGame() {
      if (this.valid) {
        const response = await http.get(`/new/${this.playerName}`);
        const { id, owner } = response.data;
        owner.isOwner = true;
        this.$store.commit('SET_GAME_ID', id);
        this.$store.commit('SET_PLAYER', owner);
        this.$router.push({
          name: 'gameSetup',
          params: {
            gameId: id,
          },
        });
      }
    },
  },
};
</script>

<style>

</style>
