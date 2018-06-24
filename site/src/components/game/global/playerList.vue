<template>
  <v-card
    flat
    width="90%"
    class="mx-auto mt-4 vertical-scroll">
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
          <v-btn
            absolute
            fab
            small
            right
            v-if="isOwner"
            color="primary"
            @click="kickPlayer(player)">
            <v-icon>mdi-account-remove</v-icon>
          </v-btn>
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
      isOwner: state => state.player.isOwner,
    }),
  },
  methods: {
    getIcon(name) {
      /* eslint-disable */
      return require(`../../../assets/images/playerIcons/${name}.svg`);
    },
    kickPlayer(player) {
      if (this.isOwner) {
        this.$socket.emit('kick_player', player.id);
      }
    }
  }
};
</script>

<style>

</style>
