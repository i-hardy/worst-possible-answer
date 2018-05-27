<template>
  <section class="mx-auto py-4 two-thirds flex flex-acenter flex-jaround">
    <v-tooltip bottom>
      <v-chip
        slot="activator"
        color="primary"
        outline
        disabled>
        <v-avatar>
          <v-icon color="primary">code</v-icon>
        </v-avatar>
        {{ code }}
      </v-chip>
      <span>Shareable game code</span>
    </v-tooltip>
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

<style lang="scss" scoped>
@import '../../../assets/scss/variables';

</style>

