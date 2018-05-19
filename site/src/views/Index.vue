<template>
  <section class="band">
    <h1 class="hero-text band__section">Worst Possible Answer</h1>
    <section class="band__section">
      A card-matching game for distant friends
    </section>
    <slide-left>
      <router-view />
    </slide-left>
  </section>
</template>

<script>
import SlideLeft from '@/components/transitions/slideLeft';

export default {
  name: 'Index',
  components: {
    SlideLeft,
  },
  mounted() {
    this.$store.commit('CLEAR_GAME');
  },
};
</script>
