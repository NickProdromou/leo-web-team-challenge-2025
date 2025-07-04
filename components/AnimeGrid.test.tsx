import React from 'react'
import { waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MockedProvider } from '@apollo/client/testing'
import type { MockedResponse } from '@apollo/client/testing'
import { renderWithChakra, screen } from '@/test/test-utils'
import { AnimeGrid } from '@/components/AnimeGrid'
import { GET_ANIME_LIST } from '@/graphql/queries'
import { 
  createMockAnimeListResponse, 
  createMockAnimeItem
} from '@/test/mock-utils'

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(null), // Default to null (page 1)
  }),
}))

const renderWithProviders = (component: React.ReactElement, mocks: MockedResponse[] = []) => {
  return renderWithChakra(
    <MockedProvider mocks={mocks} addTypename={false}>
      {component}
    </MockedProvider>
  )
}

const mockAnimeListResult = {
  request: {
    query: GET_ANIME_LIST,
    variables: { page: 1, perPage: 20 },
  },
  result: {
    data: createMockAnimeListResponse({
      Page: {
        pageInfo: {
          total: 100,
          currentPage: 1,
          lastPage: 5,
          hasNextPage: true,
        },
        media: [
          createMockAnimeItem({
            id: 21,
            title: { romaji: 'One Piece', english: 'One Piece' },
            coverImage: { large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkAxFn.jpg' },
            averageScore: 87,
            genres: ['Action', 'Adventure', 'Comedy'],
          }),
          createMockAnimeItem({
            id: 1535,
            title: { romaji: 'Death Note', english: 'Death Note' },
            coverImage: { large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-lawCwhzhi96X.jpg' },
            averageScore: 85,
            genres: ['Drama', 'Psychological', 'Supernatural'],
          }),
          createMockAnimeItem({
            id: 16498,
            title: { romaji: 'Shingeki no Kyojin', english: 'Attack on Titan' },
            coverImage: { large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg' },
            averageScore: 84,
            genres: ['Action', 'Drama'],
          }),
        ],
      },
    }),
  },
}

const mockEmptyListResult = {
  request: {
    query: GET_ANIME_LIST,
    variables: { page: 1, perPage: 20 },
  },
  result: {
    data: createMockAnimeListResponse({
      Page: {
        pageInfo: {
          total: 0,
          currentPage: 1,
          lastPage: 1,
          hasNextPage: false,
        },
        media: [],
      },
    }),
  },
}

const mockErrorResult = {
  request: {
    query: GET_ANIME_LIST,
    variables: { page: 1, perPage: 20 },
  },
  error: new Error('Network error'),
}

// Now we can test AnimeGrid with proper mocks
describe('AnimeGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays loading state initially', async () => {
    renderWithProviders(<AnimeGrid />, [])
    
    // Initially, the component should not show the anime data
    expect(screen.queryByText('One Piece')).not.toBeInTheDocument()
  })

  it('displays anime list correctly', async () => {
    renderWithProviders(<AnimeGrid />, [mockAnimeListResult])
    
    await waitFor(() => {
      expect(screen.getByText('One Piece')).toBeInTheDocument()
      expect(screen.getByText('Death Note')).toBeInTheDocument()
      expect(screen.getByText('Attack on Titan')).toBeInTheDocument()
    })
  })

  it('displays anime scores correctly', async () => {
    renderWithProviders(<AnimeGrid />, [mockAnimeListResult])
    
    await waitFor(() => {
      expect(screen.getByText('⭐ 87%')).toBeInTheDocument()
      expect(screen.getByText('⭐ 85%')).toBeInTheDocument()
      expect(screen.getByText('⭐ 84%')).toBeInTheDocument()
    })
  })

  it('displays anime genres correctly', async () => {
    renderWithProviders(<AnimeGrid />, [mockAnimeListResult])
    
    await waitFor(() => {
      expect(screen.getAllByText('Action')).toHaveLength(2) // Appears in One Piece and Attack on Titan
      expect(screen.getByText('Adventure')).toBeInTheDocument()
      expect(screen.getAllByText('Drama')).toHaveLength(2) // Appears in Death Note and Attack on Titan
      expect(screen.getByText('Psychological')).toBeInTheDocument()
    })
  })

  it('displays empty state when no anime found', async () => {
    renderWithProviders(<AnimeGrid />, [mockEmptyListResult])
    
    await waitFor(() => {
      expect(screen.getByText('No anime found')).toBeInTheDocument()
    })
  })

  it('displays error state when query fails', async () => {
    renderWithProviders(<AnimeGrid />, [mockErrorResult])
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load anime: Network error')).toBeInTheDocument()
    })
  })

  it('renders correct number of anime cards', async () => {
    renderWithProviders(<AnimeGrid />, [mockAnimeListResult])
    
    await waitFor(() => {
      const animeCards = screen.getAllByText('🎌 Anime')
      expect(animeCards).toHaveLength(3)
    })
  })
})
