import { httpClient } from '@/http/http'

export const movieServices = {
  getPopularMovies() {
    return httpClient.get('/movie/popular')
  },
  getTopRatedMovies() {
    return httpClient.get('/movie/top_rated')
  },
}
