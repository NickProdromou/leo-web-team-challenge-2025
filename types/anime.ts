export interface AnimeCoverImage {
  large: string
  medium?: string
}

export interface AnimeTitle {
  romaji: string
  english?: string
  native?: string
}

export interface AnimeStudio {
  name: string
}

export interface AnimeDate {
  year?: number
  month?: number
  day?: number
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
  popularity?: number
  genres: string[]
  episodes?: number
  season?: string
  seasonYear?: number
  status?: string
  studios?: {
    nodes: AnimeStudio[]
  }
  startDate?: AnimeDate
  endDate?: AnimeDate
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
