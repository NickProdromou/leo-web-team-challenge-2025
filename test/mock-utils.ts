import {
  AnimeListResponse,
  AnimeDetailsResponse,
  AnimeListItem,
} from '@/types/anime'

/**
 * Generate a mock AnimeListResponse using our actual TypeScript types.
 * This ensures type safety and consistency with our GraphQL queries.
 */
export const createMockAnimeListResponse = (
  overrides?: Partial<AnimeListResponse>
): AnimeListResponse => {
  const defaultResponse: AnimeListResponse = {
    Page: {
      pageInfo: {
        total: 50000,
        currentPage: 1,
        lastPage: 2500,
        hasNextPage: true,
      },
      media: [
        {
          id: 1,
          title: {
            romaji: 'One Piece',
            english: 'One Piece',
          },
          coverImage: {
            large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkSiMt.jpg',
          },
          averageScore: 90,
          genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Shounen'],
        },
        {
          id: 16498,
          title: {
            romaji: 'Shingeki no Kyojin',
            english: 'Attack on Titan',
          },
          coverImage: {
            large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg',
          },
          averageScore: 85,
          genres: ['Action', 'Drama', 'Fantasy', 'Shounen'],
        },
        {
          id: 20958,
          title: {
            romaji: 'Shingeki no Kyojin Season 2',
            english: 'Attack on Titan Season 2',
          },
          coverImage: {
            large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20958-HuFJyr54Mmir.jpg',
          },
          averageScore: 88,
          genres: ['Action', 'Drama', 'Fantasy', 'Shounen'],
        },
      ],
    },
  }

  return {
    Page: {
      ...defaultResponse.Page,
      ...overrides?.Page,
      pageInfo: {
        ...defaultResponse.Page.pageInfo,
        ...overrides?.Page?.pageInfo,
      },
      media: overrides?.Page?.media || defaultResponse.Page.media,
    },
  }
}

/**
 * Generate a mock AnimeDetailsResponse using our actual TypeScript types.
 */
export const createMockAnimeDetailsResponse = (
  overrides?: Partial<AnimeDetailsResponse>
): AnimeDetailsResponse => {
  const defaultResponse: AnimeDetailsResponse = {
    Media: {
      id: 1,
      title: {
        romaji: 'One Piece',
        english: 'One Piece',
        native: 'ワンピース',
      },
      description:
        'Gold Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world...',
      coverImage: {
        large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkSiMt.jpg',
        extraLarge: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21-YCDoj1EkSiMt.jpg',
      },
      averageScore: 90,
      genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Shounen'],
      episodes: undefined, // One Piece is ongoing
      season: 'FALL',
      seasonYear: 1999,
      status: 'RELEASING',
      format: 'TV',
      source: 'MANGA',
      duration: 24,
    },
  }

  return {
    Media: {
      ...defaultResponse.Media,
      ...overrides?.Media,
      title: {
        ...defaultResponse.Media.title,
        ...overrides?.Media?.title,
      },
      coverImage: {
        ...defaultResponse.Media.coverImage,
        ...overrides?.Media?.coverImage,
      },
    },
  }
}

/**
 * Create a mock anime list item for use in tests
 */
export const createMockAnimeItem = (overrides?: Partial<AnimeListItem>): AnimeListItem => ({
  id: 1,
  title: {
    romaji: 'Sample Anime',
    english: 'Sample Anime',
  },
  coverImage: {
    large: 'https://example.com/cover.jpg',
  },
  averageScore: 85,
  genres: ['Action', 'Adventure'],
  ...overrides,
})

/**
 * Create a mock error response for testing error states
 */
export const createMockErrorResponse = (message = 'GraphQL Error') => ({
  error: new Error(message),
  loading: false,
  data: undefined,
})

/**
 * Create a mock loading response for testing loading states
 */
export const createMockLoadingResponse = () => ({
  error: undefined,
  loading: true,
  data: undefined,
})
