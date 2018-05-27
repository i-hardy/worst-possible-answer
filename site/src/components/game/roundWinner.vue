<template>
  <div class="round-winner">
    <v-card class="primary-red">
      <v-card-text>
        <div v-if="getRoundWinner">
          {{ getRoundWinner.name }} wins the round!
        </div>
        Next round begins in {{ countdown }} seconds
      </v-card-text>
    </v-card>
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
      if (this.countdown > 0) {
        this.countdown -= 1;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';
@import '../../assets/scss/animations';

.round-winner {
  position: absolute;
  bottom: 250px;
  left: 50%;
  margin-left: $sidebarwidth;
  &:hover {
    animation: wiggle 0.2s ease;
    animation-iteration-count: 2;
  }
}
</style>
