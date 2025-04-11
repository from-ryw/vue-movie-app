<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMenuStore } from '@/stores/menuStore.js';

const menuStore = useMenuStore();
const route = useRoute();
const pathname = ref(route.path);

watch( () => route.path, 
  (newPath) => {
    pathname.value = newPath
  }
)
</script>


<template>
  <header>
    <router-link to="/" class="logo"><span>OMDbAPI</span>.COM</router-link>
    <nav>
      <ul>
        <li v-for="menu in menuStore.menus" :key="menu.href">
          <router-link :to="menu.href" :class="{ active: menu.href.split('?')[0] === pathname}">{{ menu.name }}</router-link>
        </li>
      </ul>
    </nav>
    <router-link to="/" class="user">
      <img src="@/assets/user.png" alt="User">
    </router-link>
  </header>
</template>


<style scoped>
</style>