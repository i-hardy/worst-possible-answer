<template>
  <div class="full-height full-width">
    <card-table />
    <hand />
  </div>
</template>

<script>
import Hand from '@/components/game/hand';
import CardTable from '@/components/game/table';

export default {
  name: 'Gameplay',
  components: {
    Hand,
    CardTable,
  },
};
</script>

<style lang="scss">

</style>
