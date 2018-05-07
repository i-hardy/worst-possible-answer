<template>
  <v-card
    width="90%"
    class="mx-auto">
    <v-card
      height="250px"
      class="chat-container">
      <v-list>
        <template v-for="(message, index) in messages">
          <v-card
            :key="index"
            class="flex px-2 pt-2"
            flat>
            <player-icon :player="message.player" />
            <v-list-tile-content>
              <v-list-tile-title v-html="message.player.name" />
              <p v-html="message.content" />
            </v-list-tile-content>
          </v-card>
          <v-divider
            v-if="index + 1 < messages.length"
            :key="`divider-${index}`" />
        </template>
      </v-list>
    </v-card>
    <v-divider dark />
    <v-card flat>
      <v-form
        class="px-3 flex flex-acenter"
        @submit.prevent="sendMessage">
        <span style="width:80%">
          <v-text-field
            v-model="newMessage"
            solo/>
        </span>
        <v-btn
          absolute
          fab
          small
          right
          color="primary"
          @click="sendMessage">
          <v-icon>chat_bubble_outline</v-icon>
        </v-btn>
      </v-form>
    </v-card>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import PlayerIcon from '@/components/player/playerIcon';

export default {
  name: 'Chat',
  components: {
    PlayerIcon,
  },
  data() {
    return {
      newMessage: '',
    };
  },
  computed: {
    ...mapState({
      messages: state => state.game.chat,
      gameID: state => state.gameID,
      player: state => state.player,
    }),
  },
  mounted() {
    this.joinRoom();
  },
  methods: {
    joinRoom() {
      const joinPacket = {
        gameID: this.gameID,
        player: this.player,
      };
      this.$socket.emit('room', joinPacket);
    },
    sendMessage() {
      const message = {
        gameID: this.gameID,
        player: this.player,
        content: this.newMessage,
      };
      this.$socket.emit('chat_message', message);
      this.newMessage = '';
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.chat-container {
  overflow: auto;
}

</style>
