<template>
  <v-card
    width="90%"
    class="mx-auto">
    <v-list>
      <template v-for="(message, index) in messages">
        <v-list-tile
          :key="index"
          avatar>
          <v-list-tile-avatar :tile="true">
            <v-badge
              overlap
              left>
              <span
                v-if="message.player.name === 'idgie'"
                slot="badge"
                class="icon__czar-badge">
                <svg
                  style="width:24px;height:24px"
                  viewBox="0 0 24 24">
                  <path
                    d="M5,16L3,5L8.5,12L12,5L15.5,12L21,5L19,16H5M19,19A1,
                      1 0 0,1 18,20H6A1,1 0 0,1 5,19V18H19V19Z" />
                </svg>
              </span>
              <img
                :src="getIcon(message.player.icon)"
                style="height:32px">
            </v-badge>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="message.player.name" />
            <v-list-tile-sub-title v-html="message.content" />
          </v-list-tile-content>
        </v-list-tile>
        <v-divider
          v-if="index + 1 < messages.length"
          :key="`divider-${index}`"
          inset />
      </template>
    </v-list>
    <v-divider dark />
    <v-card flat>
      <v-form
        class="px-3 flex flex-acenter"
        @submit.prevent>
        <v-text-field
          v-model="newMessage" />
        <v-btn
          absolute
          fab
          small
          right
          color="primary">
          <v-icon>chat_bubble_outline</v-icon>
        </v-btn>
      </v-form>
    </v-card>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Chat',
  data() {
    return {
      newMessage: '',
    };
  },
  computed: {
    ...mapState({
      messages: state => state.game.chat,
    }),
  },
  methods: {
    getIcon(name) {
      /* eslint-disable */
      return require(`@/assets/images/playerIcons/${name}.svg`);
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.icon__czar-badge {
  transform: rotate(-45deg);
  & svg {
    fill: $primary-red;
  }
}
</style>
