<script setup>
const props = defineProps({
  movie: {
    Poster: String,
    Title: String,
    Type: String,
    Year: String,
    imdbID: String
  }
});
</script>


<template>
  <a :href="`/movie?id=${movie.imdbID}`" class="movie" :style="{ backgroundImage: `url(${movie.Poster})` }">
    <div class="info">
      <div class="year">{{ movie.Year }}</div>
      <div class="title">{{ movie.Title }}</div>
    </div>
  </a>
</template>


<style scoped>
</style>