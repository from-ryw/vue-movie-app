<script setup>
import { useAboutStore } from '@/stores/aboutStore.js';
 
 const aboutStore = useAboutStore();
</script>


<template>
  <div class="container about">
    <div class="photo" :style="{ backgroundImage: `url(${aboutStore.photo})` }"></div>
    <p class="name">{{ aboutStore.name }}</p>
    <p class="email"><a :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${aboutStore.email}`" target="_blank">{{ aboutStore.email }}</a></p>
    <p class="email"><a :href="aboutStore.github" target="_blank">GitHub</a></p>
  </div>
</template>


<style scoped>
</style>