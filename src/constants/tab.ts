import { movieServices } from '@/services/movie'
import { trendingServices } from '@/services/trending'
import { tvServices } from '@/services/tv'

export const TAB_CONFIG = {
  TRENDING: {
    label: 'Trending',
    items: [
      {
        id: 'all',
        label: 'All',
        fetcher: trendingServices.getAllTrending,
      },
      {
        id: 'movie',
        label: 'Movie',
        fetcher: trendingServices.getMovieTrending,
      },
      {
        id: 'tv',
        label: 'TV Show',
        fetcher: trendingServices.getTvTrending,
      },
    ],
  },

  TOP_RATED: {
    label: 'Top Rated',
    items: [
      {
        id: 'movie',
        label: 'Movie',
        fetcher: movieServices.getTopRatedMovies,
      },
      {
        id: 'tv',
        label: 'TV Show',
        fetcher: tvServices.getTopRatedTv,
      },
    ],
  },
}
