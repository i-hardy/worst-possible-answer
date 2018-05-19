<template>
  <v-card
    flat
    width="90%"
    class="mx-auto mt-4">
    <v-list
      dense>
      <template v-for="(player, index) in players">
        <v-list-tile
          :key="player.id"
          avatar>
          <player-icon :player="player" />
          <v-list-tile-content>
            <v-list-tile-title v-text="player.name" />
            <v-list-tile-sub-title v-text="`${player.points} points`" />
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          v-if="index + 1 < players.length"
          :key="`divider-${index}`" />
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import PlayerIcon from '@/components/game/player/playerIcon';

export default {
  name: 'PlayerList',
  components: {
    PlayerIcon,
  },
  computed: {
    ...mapState({
      players: state => state.game.players,
    }),
  },
  methods: {
    getIcon(name) {
      /* eslint-disable */
      return require(`../../../assets/images/playerIcons/${name}.svg`);
    },
  }
};
</script>

<style>

</style>
