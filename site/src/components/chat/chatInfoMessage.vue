<template>
  <v-list-tile class="primary-red--text">
    <v-list-tile-content>
      <v-list-tile-sub-title v-html="message.content" />
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'ChatInfoMessage',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>

</style>
