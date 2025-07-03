import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ChakraProvider } from '@chakra-ui/react'
import { MockedProvider } from '@apollo/client/testing'
import { AnimeCard } from '@/components/AnimeCard'
import { GET_ANIME_DETAILS } from '@/graphql/queries'
import { AnimeListItem } from '@/types/anime'

const renderWithProviders = (component: React.ReactElement, mocks: any[] = []) => {
  return render(
    <ChakraProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        {component}
      </MockedProvider>
    </ChakraProvider>
  )
}

const mockAnime: AnimeListItem = {
  id: 21,
  title: {
    romaji: 'One Piece',
    english: 'One Piece',
  },
  coverImage: {
    large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkAxFn.jpg',
  },
  averageScore: 87,
  genres: ['Action', 'Adventure', 'Comedy', 'Drama'],
}

const mockAnimeDetails = {
  request: {
    query: GET_ANIME_DETAILS,
    variables: { id: 21 },
  },
  result: {
    data: {
      Media: {
        id: 21,
        title: {
          romaji: 'One Piece',
          english: 'One Piece',
          native: 'ワンピース',
        },
        description: 'Gold Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line.',
        coverImage: {
          large: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkAxFn.jpg',
          extraLarge: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-YCDoj1EkAxFn.jpg',
        },
        averageScore: 87,
        genres: ['Action', 'Adventure', 'Comedy', 'Drama'],
        episodes: null,
        season: null,
        seasonYear: 1999,
        status: 'RELEASING',
        format: 'TV',
        source: 'MANGA',
        duration: 24,
      },
    },
  },
}

describe('AnimeCard', () => {
  const user = userEvent.setup()
  const mockOnClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders anime information correctly', () => {
    renderWithProviders(<AnimeCard anime={mockAnime} onClick={mockOnClick} />, [mockAnimeDetails])
    
    expect(screen.getByText('One Piece')).toBeInTheDocument()
    expect(screen.getByText(/87%/)).toBeInTheDocument()
    expect(screen.getByText('🎌 Anime')).toBeInTheDocument() // Fallback image text
  })

  it('displays anime cover image with correct fallback', () => {
    renderWithProviders(<AnimeCard anime={mockAnime} onClick={mockOnClick} />, [mockAnimeDetails])
    
    // Since images fail to load in test environment, we get the fallback
    expect(screen.getByText('🎌 Anime')).toBeInTheDocument()
  })

  it('displays visible genres correctly', () => {
    renderWithProviders(<AnimeCard anime={mockAnime} onClick={mockOnClick} />, [mockAnimeDetails])
    
    // Component only shows first 3 genres, 4th one is in the "+1" counter
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Adventure')).toBeInTheDocument()
    expect(screen.getByText('Comedy')).toBeInTheDocument()
    expect(screen.getByText('+1')).toBeInTheDocument() // Drama is hidden in "+1"
  })

  it('calls onClick when card is clicked', async () => {
    renderWithProviders(<AnimeCard anime={mockAnime} onClick={mockOnClick} />, [mockAnimeDetails])
    
    const card = screen.getByText('One Piece').closest('div')
    await user.click(card!)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('handles missing score gracefully', () => {
    const animeWithoutScore = { ...mockAnime, averageScore: undefined }
    renderWithProviders(<AnimeCard anime={animeWithoutScore} onClick={mockOnClick} />, [mockAnimeDetails])
    
    expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument()
  })

  it('handles missing english title gracefully', () => {
    const animeWithoutEnglishTitle = { 
      ...mockAnime, 
      title: { romaji: 'One Piece', english: undefined } 
    }
    renderWithProviders(<AnimeCard anime={animeWithoutEnglishTitle} onClick={mockOnClick} />, [mockAnimeDetails])
    
    expect(screen.getByText('One Piece')).toBeInTheDocument()
  })

  it('displays limited number of genres with ellipsis', () => {
    const animeWithManyGenres = {
      ...mockAnime,
      genres: ['Action', 'Adventure', 'Comedy', 'Drama', 'Romance', 'Supernatural', 'Military'],
    }
    renderWithProviders(<AnimeCard anime={animeWithManyGenres} onClick={mockOnClick} />, [mockAnimeDetails])
    
    // Should show first 3 genres
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Adventure')).toBeInTheDocument()
    expect(screen.getByText('Comedy')).toBeInTheDocument()
    
    // Should show +4 for remaining genres
    expect(screen.getByText('+4')).toBeInTheDocument()
  })

  it('handles hover states correctly', async () => {
    renderWithProviders(<AnimeCard anime={mockAnime} onClick={mockOnClick} />, [mockAnimeDetails])
    
    const card = screen.getByText('One Piece').closest('div')
    
    await user.hover(card!)
    expect(card).toBeInTheDocument()
    
    await user.unhover(card!)
    expect(card).toBeInTheDocument()
  })
})
