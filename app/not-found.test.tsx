import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderWithChakra, screen } from '@/test/test-utils'
import NotFound from './not-found'

describe('NotFound Page', () => {
  it('renders not found message and home link correctly', () => {
    renderWithChakra(<NotFound />)

    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
    expect(screen.getByText("The page you're looking for doesn't exist")).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
  })

  it('displays search emoji', () => {
    renderWithChakra(<NotFound />)

    expect(screen.getByText('🔍')).toBeInTheDocument()
  })

  it('has correct link to home page', () => {
    renderWithChakra(<NotFound />)

    const homeLink = screen.getByRole('link', { name: /back to home/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
