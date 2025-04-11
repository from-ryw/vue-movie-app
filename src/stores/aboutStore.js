import { defineStore } from 'pinia';
import userImg from '@/assets/user.png'

export const useAboutStore = defineStore('about', {
  state: () => ({
    photo: userImg,
    name: 'FROM RYW / RyuYeWon',
    email: 'from.ryw@gmail.com',
    github: 'https://github.com/from-ryw',
    repository: 'https://github.com/from-ryw/vue-movie-app'
  })
});