<template>
  <section class="band__section button-wrapper">
    <new-game-dialog />
    <join-game-dialog />
  </section>
</template>

<script>
import NewGameDialog from '@/components/dialogs/new-game-dialog';
import JoinGameDialog from '@/components/dialogs/join-game-dialog';

export default {
  name: 'LandingPage',
  components: {
    NewGameDialog,
    JoinGameDialog,
  },
};
</script>
