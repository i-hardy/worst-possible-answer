<template>
  <aside>
    <h1 class="white-text">Worst Possible Answer</h1>
    <chat />
  </aside>
</template>

<script>
import Chat from '@/components/chat/chat';

export default {
  name: 'Sidebar',
  components: {
    Chat,
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

</style>
