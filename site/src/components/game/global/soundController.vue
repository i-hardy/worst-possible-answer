<template>
  <v-card
    flat
    width="90%"
    height="4.5rem"
    class="mx-auto mt-4">
    <v-card-text>
      <v-switch
        v-model="soundEnabled"
        :label="labelText"
        color="secondary"/>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SoundController',
  data() {
    return {
      soundEnabled: true,
      unlisten: () => {},
    };
  },
  computed: {
    ...mapGetters(['getClientIsCzar']),
    labelText() {
      const status = this.soundEnabled ? 'ON' : 'OFF';
      return `Audio: ${status}`;
    },
  },
  mounted() {
    this.setListener();
  },
  methods: {
    playSoundAsset(asset) {
      const audio = new Audio(require(`@/assets/audio/${asset}`));
      audio.play();
    },
    setListener() {
      this.unlisten = this.$store.subscribe((mutation) => {
        if (mutation.type === 'SOCKET_SET_CALL_CARD' && !this.getClientIsCzar) {
          this.playSoundAsset('capisci.ogg');
        } else if (mutation.type === 'SOCKET_SEND_ALL_RESPONSES' && this.getClientIsCzar) {
          this.playSoundAsset('pedantic.ogg');
        }
      });
    }
  },
  watch: {
    soundEnabled(newVal) {
      if (newVal) {
        this.setListener();
      } else {
        this.unlisten();
      }
    },
  },
};
</script>

<style>

</style>
