interface MovieItem {
  id: number
  backdrop_path: string
  title: string
  release_date: string
  overview: string
  [key: string]: any
}

interface VideoItem {
  type: string
  site: string
  key: string
  [key: string]: any
}
export type { MovieItem, VideoItem }
