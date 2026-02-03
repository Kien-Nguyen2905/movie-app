import { httpClient } from '@/http/http'

export const tvServices = {
  getTopRatedTv() {
    return httpClient.get('/tv/top_rated')
  },
  getTvShowById(tvId: string) {
    return httpClient.get(`/tv/${tvId}?append_to_response=content_ratings,aggregate_credits,videos`)
  },
  getRelatedTvShow(id: string) {
    return httpClient.get(`/tv/${id}/recommendations`)
  },
}
