import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [
      {
        name: 'Search',
        href: '/'
      },
      {
        name: 'Movie',
        href: '/movie?id=tt0817177'
      },
      {
        name: 'About',
        href: '/about'
      }
    ]
  })
});