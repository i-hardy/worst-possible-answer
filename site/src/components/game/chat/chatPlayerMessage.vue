<template>
  <v-card
    class="flex px-2 pt-2"
    flat>
    <player-icon :player="message.player" />
    <v-list-tile-content>
      <v-list-tile-title v-html="message.player.name" />
      <p v-html="message.content" />
    </v-list-tile-content>
  </v-card>
</template>

<script>
import PlayerIcon from '@/components/game/player/playerIcon';

export default {
  name: 'ChatPlayerMessage',
  components: {
    PlayerIcon,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>
