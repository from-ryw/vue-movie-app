import { defineStore } from 'pinia'
import axios from 'axios'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    searchText: '',
    page: 1,
    pageMax: 1,
    movies: [],
    movie: {},
    isLoading: false,
    message: 'Search for the movie title!'
  }),

  actions: {
    async searchMovies(page) {
      if (this.searchText.trim()) {
        this.isLoading = true;
        this.page = page;

        if (page === 1) {
          this.movies = [];
          this.message = '';
        }

        try {
          // const res = await axios.post(`https://omdbapi.com?apikey=발급받은APIKEY&s=${this.searchText}&page=${page}`);
          const res = await axios.post('/api/movie-api', {
            title: this.searchText,
            page
          });
          console.log(res.data);
          if (res.data.Response === 'True') {
            this.movies = [
              ...this.movies,
              ...res.data.Search
            ];
            console.log("1111");
            console.log(this.movies);
            this.pageMax = Math.ceil(Number(res.data.totalResults) / 10);
          } else {
            this.message = res.data.Error;
          }

        } catch (error) {
          console.log('searchMovies error:', error);
        }

        this.isLoading = false;
      }
    },
    async getMovieDetails(id) {
      this.isLoading = true;
      try {
        // const res = await axios.post(`https://omdbapi.com?apikey=발급받은APIKEY&i=${id}&plot=full`);
        const res = await axios.post('/api/movie-api', {
          id
        });
        this.movie = res.data;
        if (this.movie.Poster) {
          this.movie.Poster = this.movie.Poster.replace('SX300', 'SX700');
        }
      } catch (error) {
        console.log('getMovieDetails error:', error);
      }
      this.isLoading = false;
    }
  },
  persist: {
    storage: sessionStorage
  }
})