import { httpClient } from '@/http/http'

export const movieServices = {
  getPopularMovies() {
    return httpClient.get(
      '/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&include_video=true',
    )
  },
  getTopRatedMovies() {
    return httpClient.get('/movie/top_rated')
  },
  getMovieById(id: string) {
    return httpClient.get(`/movie/${id}?append_to_response=release_dates,credits,videos`)
  },
  getRelatedMovies(id: string) {
    return httpClient.get(`/movie/${id}/recommendations`)
  },
  getVideosMovie(id: string | number) {
    return httpClient.get(`/movie/${id}/videos`)
  },
}
