<template>
  <aside>
    <h1 class="white-text">Worst Possible Answer</h1>
    <section class="aside__container">
      <chat />
      <sound-controller />
      <player-list />
    </section>
  </aside>
</template>

<script>
import Chat from '@/components/game/chat/chat';
import PlayerList from '@/components/game/global/playerList';
import SoundController from '@/components/game/global/soundController';

export default {
  name: 'Sidebar',
  components: {
    Chat,
    PlayerList,
    SoundController,
  },
};
</script>

<style lang="scss">
@import '../../../assets/scss/variables';

aside {
  position: absolute;
  background-color: $medium-teal;
  width: $sidebarwidth;
  overflow: hidden;
  height: 100%;
  z-index: 100;
}

.aside__container {
  max-height: 90%;
}

</style>
