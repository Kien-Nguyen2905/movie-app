import { httpClient } from '@/http/http'

export const movieServices = {
  getPopularMovies() {
    return httpClient.get('/movie/popular')
  },
  getTopRatedMovies() {
    return httpClient.get('/movie/top_rated')
  },
  getMovieById(id: string) {
    return httpClient.get(`/movie/${id}?append_to_response=release_dates,credits`)
  },
  getRelatedMovies(id: string) {
    return httpClient.get(`/movie/${id}/recommendations`)
  },
}
