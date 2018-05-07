<template>
  <aside>
    <h1 class="white-text">Worst Possible Answer</h1>
    <v-list></v-list>
  </aside>
</template>

<script>
export default {
  name: 'sidebar',
}
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
