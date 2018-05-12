<template>
  <section>
    <sidebar />
    <section class="content content__with-sidebar">
      <router-view style="width:100%" />
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Sidebar from '@/components/global/sidebar';

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
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.content {
  width: 100%;
  &__with-sidebar {
    margin-left: $sidebarwidth;
    width: calc(100% - #{$sidebarwidth});
  }
}

.one-third {
  width: 33%;
}

.two-thirds {
  width: 66%;
}
</style>

