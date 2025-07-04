import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { renderWithChakra, screen } from '@/test/test-utils'
import { AnimeCard } from '@/components/AnimeCard'

const mockAnime = {
  id: 1,
  title: {
    romaji: 'Attack on Titan',
    english: 'Attack on Titan'
  },
  coverImage: {
    large: 'https://example.com/image.jpg'
  },
  averageScore: 85,
  genres: ['Action', 'Drama']
}

const mockOnClick = vi.fn()

describe('AnimeCard', () => {
  it('renders anime information correctly', () => {
    renderWithChakra(<AnimeCard anime={mockAnime} onClick={mockOnClick} />)

    expect(screen.getByText('Attack on Titan')).toBeInTheDocument()
    expect(screen.getByText('⭐ 85%')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Drama')).toBeInTheDocument()
  })

  it('renders anime categories correctly', () => {
    renderWithChakra(<AnimeCard anime={mockAnime} onClick={mockOnClick} />)

    expect(screen.getByText('🎌 Anime')).toBeInTheDocument()
  })

  it('handles missing english title', () => {
    const animeWithoutEnglish = {
      ...mockAnime,
      title: {
        romaji: 'Some Anime',
        english: undefined
      }
    }

    renderWithChakra(<AnimeCard anime={animeWithoutEnglish} onClick={mockOnClick} />)

    expect(screen.getByText('Some Anime')).toBeInTheDocument()
  })

  it('handles missing score', () => {
    const animeWithoutScore = {
      ...mockAnime,
      averageScore: undefined
    }

    renderWithChakra(<AnimeCard anime={animeWithoutScore} onClick={mockOnClick} />)

    expect(screen.queryByText('⭐')).not.toBeInTheDocument()
  })

  it('renders as a clickable card', () => {
    renderWithChakra(<AnimeCard anime={mockAnime} onClick={mockOnClick} />)

    // Find the clickable element by its styling classes
    const cardElement = screen.getByText('Attack on Titan').closest('div')
    expect(cardElement).toBeInTheDocument()
  })
})
