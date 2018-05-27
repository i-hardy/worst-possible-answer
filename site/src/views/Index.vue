<template>
  <section class="band index">
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

<style lang="scss">
@import '../assets/scss/variables';

.index:after{
  content: "beta";
  position: fixed;
  width: 150px;
  height: 35px;
  background: $medium-teal;
  top: 17px;
  left: -40px;
  text-align: center;
  font-size: 24px;
  text-transform: uppercase;
  font-weight: bold;
  color: $white;
  line-height: 2.75rem;
  transform:rotate(-45deg);
}
</style>
