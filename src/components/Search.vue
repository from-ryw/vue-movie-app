<script setup>
import { useMovieStore } from '@/stores/movieStore';
 
const movieStore = useMovieStore();
</script>

<template>
  <div class="search">
    <input v-model="movieStore.searchText" @keydown.enter="movieStore.searchMovies(1)" placeholder="Enter the movie title to search!" />
    <button @click="movieStore.searchMovies(1)" class="btn btn-primary">
      Search!
    </button>
  </div>
</template>

<style scoped>

</style>