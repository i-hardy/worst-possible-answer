<template>
  <section class="mx-auto py-4 two-thirds flex flex-acenter flex-jbetween">
    <section>
      <v-avatar
        v-ripple
        color="secondary"
        size="32">
        <v-icon
          :data-clipboard-text="link"
          @click="copy($event.target)">link</v-icon>
      </v-avatar>
    </section>
    <section>
      <v-avatar
        v-ripple
        color="secondary"
        size="32">
        <v-icon
          :data-clipboard-text="code"
          @click="copy($event.target)">code</v-icon>
      </v-avatar>
    </section>
  </section>
</template>

<script>
import Clipboard from 'clipboard';

export default {
  name: 'Shareables',
  props: {
    link: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
    };
  },
  methods: {
    copy(node) {
      console.log(node);
      const clipboard = new Clipboard(node);
      clipboard.on('success', () => {
        this.snackbar = true;
        clipboard.destroy();
      });
    },
  },
};
</script>
