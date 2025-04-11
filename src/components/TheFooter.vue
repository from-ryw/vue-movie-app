<script setup>
import { useAboutStore } from '@/stores/aboutStore.js';
 
 const aboutStore = useAboutStore();
</script>


<template>
  <footer>
    <div>
      <a :href="aboutStore.repository">
        GitHub Repository
      </a>
    </div>
    <div>
      <a :href="aboutStore.github">
        {{ new Date().getFullYear() }}
        RYU YEWON
      </a>
    </div>
  </footer>
</template>


<style scoped>
</style>