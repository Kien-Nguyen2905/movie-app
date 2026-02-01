import { httpClient } from '@/http/http'

export const trendingServices = {
  getAllTrending() {
    return httpClient.get('/trending/all/day')
  },
  getMovieTrending() {
    return httpClient.get('/trending/movie/day')
  },
  getTvTrending() {
    return httpClient.get('/trending/tv/day')
  },
}
