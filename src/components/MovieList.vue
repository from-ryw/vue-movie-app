<script setup>
import { useMovieStore } from '@/stores/movieStore';
import MovieItem from '@/components/MovieItem.vue'
 
const movieStore = useMovieStore();
</script>


<template>
  <div class="movie-list">
    <div v-if=" movieStore.message" class="message">{{ movieStore.message }}</div>
    <div v-else class="movies">
      <MovieItem v-for="movie in movieStore.movies" :key="movie.imdbID" :movie="movie"/>
    </div>
    <div class="the-loader" :class="{ hide: !movieStore.isLoading}"></div>
  </div>
</template>


<style scoped>
</style>