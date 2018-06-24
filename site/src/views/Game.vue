<template>
  <section class="full-height">
    <sidebar />
    <sidebar-toggle />
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
import SidebarToggle from '@/components/game/global/sidebarToggle';

export default {
  name: 'Game',
  components: {
    Sidebar,
    SidebarToggle
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
      toastMessage: state => state.client.toastMessage,
      nudgeMessage: state => state.client.nudgeMessage,
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
    this.getPermissions();
  },
  methods: {
    joinRoom() {
      const joinPacket = {
        gameID: this.gameID,
        player: this.player,
      };
      this.$socket.emit('room', joinPacket);
    },
    getPermissions() {
      Push.Permission.request();
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
@import '../assets/scss/imports';

.content {
  height: 100%;
  width: 100%;
  &__with-sidebar {
    margin-left: $sidebarwidth;
    width: calc(100% - #{$sidebarwidth});
    @include mq($from: mobile, $until: tablet) {
      margin-left: 0;
      width: 100%;
    }
  }
}

.snack__content {
  background: $primary-red;
}
</style>

