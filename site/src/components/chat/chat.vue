<template>
  <v-card
    width="90%"
    class="mx-auto">
    <v-card
      v-chat-scroll="{ always: false }"
      height="250px"
      class="chat-container">
      <v-list>
        <chat-message
          v-for="(message, index) in messages"
          :key="index"
          :message="message" />
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
import ChatMessage from '@/components/chat/chatMessage';

export default {
  name: 'Chat',
  components: {
    ChatMessage,
  },
  data() {
    return {
      newMessage: '',
    };
  },
  computed: {
    ...mapState({
      messages: state => state.game.chat,
      gameID: state => state.game.gameID,
      player: state => state.player,
    }),
  },
  methods: {
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
