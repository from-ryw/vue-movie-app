<script setup>
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/stores/movieStore';
import { ref, onMounted } from 'vue';
 
const route = useRoute();
const movieStore = useMovieStore();
const bigPoster = ref('');

onMounted(async () => {
  await movieStore.getMovieDetails(route.query.id);
})
</script>


<template>
  <div class="container the-movie">
    <template v-if="!movieStore.isLoading">
      <div class="poster" :style="{ backgroundImage: `url(${movieStore.movie.Poster})` }"></div>
      <div class="specs">
        <div class="title">
          {{ movieStore.movie.Title }}
        </div>
        <div class="labels">
          <span>{{ movieStore.movie.Released }}</span>
          &nbsp;/
          <span>{{ movieStore.movie.Runtime }}</span>
          &nbsp;/
          <span>{{ movieStore.movie.Country }}</span>
        </div>
        <div class="plot">
          {{ movieStore.movie.Plot }}
        </div>
        <div v-if="movieStore.movie.Ratings?.length">
          <h3>Ratings</h3>
          <p v-for="rating in movieStore.movie.Ratings" :key="rating.Source">
            {{ rating.Source }} - {{ rating.Value }}
          </p>
        </div>
        <div>
          <h3>Actors</h3>
          <p>{{ movieStore.movie.Actors }}</p>
        </div>
        <div>
          <h3>Director</h3>
          <p>{{ movieStore.movie.Director }}</p>
        </div>
        <div>
          <h3>Production</h3>
          <p>{{ movieStore.movie.Production }}</p>
        </div>
        <div>
          <h3>Genre</h3>
          <p>{{ movieStore.movie.Genre }}</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="poster skeleton"></div>
      <div class="specs">
        <div class="title skeleton"></div>
        <div class="labels skeleton"></div>
        <div class="plot skeleton"></div>
      </div>
    </template>
  </div>
</template>


<style>
</style>