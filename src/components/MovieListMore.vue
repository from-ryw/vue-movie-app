<script setup>
import { useMovieStore } from '@/stores/movieStore';

const movieStore = useMovieStore();

async function loadMore() {
  await movieStore.searchMovies(movieStore.page + 1)
}
</script>


<template>
  <button class="view-more btn" :class="{ hide: movieStore.page >= movieStore.pageMax}" @click="loadMore">View more..</button>
</template>


<style scoped>
</style>