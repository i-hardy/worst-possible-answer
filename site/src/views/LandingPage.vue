<template>
  <section class="band">
    <h1 class="hero-text band__section">Worst Possible Answer</h1>
    <section class="band__section">
      A card-matching game for distant friends
    </section>
    <section class="band__section button-wrapper">
      <new-game-dialog />
      <join-game-dialog />
    </section>
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
