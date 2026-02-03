import { httpClient } from '@/http/http'

export const personServices = {
  getPersonById(id: string | number) {
    return httpClient.get(`/person/${id}?append_to_response=combined_credits`)
  },
}
