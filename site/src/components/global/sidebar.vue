<template>
  <aside>
    <h1 class="white-text">Worst Possible Answer</h1>
    <section class="aside--section_two-thirds">
      <chat />
      <player-list />
    </section>
  </aside>
</template>

<script>
import Chat from '@/components/chat/chat';
import PlayerList from '@/components/global/playerList';

export default {
  name: 'Sidebar',
  components: {
    Chat,
    PlayerList,
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';

aside {
  position: absolute;
  background-color: $medium-teal;
  width: $sidebarwidth;
  height: 100%;
}

.aside--section_two-thirds {
  max-height: 66%;
}

</style>
