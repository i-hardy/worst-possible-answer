<template>
  <section>
    <v-dialog max-width="500px">
      <v-btn
        slot="activator"
        color="primary">
        Join a Game
      </v-btn>
      <v-card>
        <v-card-text>
          <v-form
            v-model="valid"
            @submit.prevent="joinGame">
            <v-text-field
              v-model="playerName"
              :rules="[v => !!v || 'You need to enter a name!']"
              autofocus
              label="Your nickname"
              required
            />
            <v-text-field
              v-model="gameCode"
              :rules="[v => !!v || 'You need to enter a game code!']"
              label="Enter the game code"
              required
            />
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="joinGame">Join Game</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import http from '@/services/http';

export default {
  name: 'JoinGameDialog',
  data() {
    return {
      valid: false,
      playerName: '',
      gameCode: '',
    };
  },
  methods: {
    async joinGame() {
      if (this.valid) {
        const response = await http.post(`/${this.gameCode}/player/${this.playerName}`);
        const { name, icon, playerID } = response.data;
        const player = {
          playerID,
          name,
          icon,
          isOwner: false,
        };
        this.$store.commit('SET_GAME_ID', this.gameCode);
        this.$store.commit('SET_PLAYER', player);
        this.$router.push({
          name: 'waiting',
          params: {
            gameId: this.gameCode,
          },
        });
      }
    },
  },
};
</script>
