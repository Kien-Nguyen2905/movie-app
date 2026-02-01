import { httpClient } from '@/http/http'

export const tvServices = {
  getTopRatedTv() {
    return httpClient.get('/tv/top_rated')
  },
}
