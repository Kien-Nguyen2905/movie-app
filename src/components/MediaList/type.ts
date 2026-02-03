interface MediaItem {
  id: number
  title?: string
  name?: string
  release_date?: string
  first_air_date?: string
  poster_path: string
  vote_average: number
  media_type?: string
  [key: string]: any
}

interface TabItem {
  id: string
  label: string
  fetcher: () => Promise<any>
}
export type { MediaItem, TabItem }
