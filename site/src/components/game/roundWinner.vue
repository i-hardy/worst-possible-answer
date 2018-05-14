<template>
  <div class="round-winner">
    <div v-if="getRoundWinner">
      {{ getRoundWinner.name }} wins the round!
    </div>
    Next round begins in {{ countdown }} seconds
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RoundWinner',
  data() {
    return {
      countdown: 8,
      countdownInterval: null,
    };
  },
  computed: {
    ...mapGetters(['getRoundWinner']),
  },
  mounted() {
    this.countdownInterval = setInterval(
      this.countDown.bind(this),
      1000,
    );
  },
  beforeDestroy() {
    clearInterval(this.countdownInterval);
  },
  methods: {
    countDown() {
      this.countdown -= 1;
    },
  },
};
</script>

<style lang="scss">
.round-winner {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
