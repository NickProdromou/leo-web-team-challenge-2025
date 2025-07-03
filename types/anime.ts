export interface AnimeCoverImage {
  large: string
  extraLarge?: string
}

export interface AnimeTitle {
  romaji: string
  english?: string
  native?: string
}

// Minimal data for list view
export interface AnimeListItem {
  id: number
  title: AnimeTitle
  coverImage: AnimeCoverImage
  averageScore?: number
  genres: string[]
}

// Full data for detail view
export interface AnimeDetails {
  id: number
  title: AnimeTitle
  description?: string
  coverImage: AnimeCoverImage
  averageScore?: number
  genres: string[]
  episodes?: number
  season?: string
  seasonYear?: number
  status?: string
  format?: string
  source?: string
  duration?: number
}

export interface AnimeListResponse {
  Page: {
    media: AnimeListItem[]
    pageInfo: {
      total: number
      currentPage: number
      lastPage: number
      hasNextPage: boolean
    }
  }
}

export interface AnimeDetailsResponse {
  Media: AnimeDetails
}
