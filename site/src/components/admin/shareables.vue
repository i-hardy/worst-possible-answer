<template>
  <section class="mx-auto py-4 two-thirds flex flex-acenter flex-jaround">
    <v-chip
      class="primary-red shareable-chip"
      disabled>
      <v-icon left>code</v-icon>
      {{ code }}
    </v-chip>
    <v-chip
      class="primary-red shareable-chip"
      disabled>
      {{ link }}
      <v-icon right>link</v-icon>
    </v-chip>
  </section>
</template>

<script>
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
};
</script>
