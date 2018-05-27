<template>
  <section class="full-height">
    <sidebar />
    <section class="content content__with-sidebar">
      <router-view style="width:100%;" />
    </section>
    <v-snackbar
      v-model="toastMessage.show"
      :timeout="4000"
      right>
      {{ toastMessage.content }}
    </v-snackbar>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Push from 'push.js';
import Sidebar from '@/components/game/global/sidebar';

export default {
  name: 'Game',
  components: {
    Sidebar,
  },
  sockets: {
    startGame() {
      this.$router.push({
        name: 'play',
      });
    },
  },
  computed: {
    ...mapState({
      gameID: state => state.game.gameID,
      player: state => state.player,
      toastMessage: state => state.messaging.toastMessage,
      nudgeMessage: state => state.messaging.nudgeMessage,
    }),
  },
  watch: {
    'nudgeMessage.show': {
      handler(newVal) {
        if (newVal) {
          this.sendNudge();
        }
      },
    },
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
    sendNudge() {
      Push.create(this.nudgeMessage.content, {
        timeout: 4000,
        onClick() {
          window.focus();
          this.close();
        },
      });
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/variables';

.content {
  height: 100%;
  width: 100%;
  &__with-sidebar {
    margin-left: $sidebarwidth;
    width: calc(100% - #{$sidebarwidth});
  }
}

.snack__content {
  background: $primary-red;
}
</style>

