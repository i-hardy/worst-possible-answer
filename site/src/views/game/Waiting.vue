<template>
  <section>
    <h1 class="hero-text">
      The game is being set up...
    </h1>
    <div class="my-4">
      Please enjoy this randomly selected cat gif while you wait
    </div>
    <div class="mx-auto two-thirds gif-wrapper">
      <img
        class="mt-2 gif"
        src="https://thecatapi.com/api/images/get?api_key=MjEzOTk4&format=src&type=gif">
    </div>
    <div>
      <small>Courtesy of
        <a
          href="https://thecatapi.com/"
          target="_blank"> The Cat API</a>
      </small>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Waiting',
};
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.gif {
  border: $highlight-border solid $primary-red;
  border-radius: 7px;
  max-height: 400px;
}
</style>
