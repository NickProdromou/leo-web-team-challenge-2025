import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderWithChakra, screen } from '@/test/test-utils'
import { LoadingSpinner } from '@/components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default message', () => {
    renderWithChakra(<LoadingSpinner />)

    expect(screen.getAllByText('Loading...')).toHaveLength(2) // Chakra Spinner creates both hidden and visible text
    expect(screen.getByText('Loading...', { selector: 'p' })).toBeInTheDocument() // Get the visible text element
  })

  it('renders with custom message', () => {
    renderWithChakra(<LoadingSpinner message="Fetching anime data..." />)

    expect(screen.getByText('Fetching anime data...')).toBeInTheDocument()
    expect(screen.getAllByText('Loading...')).toHaveLength(1) // Only the hidden spinner text
  })

  it('renders spinner component', () => {
    renderWithChakra(<LoadingSpinner />)

    // Check that the spinner is present by looking for the spinner class
    const spinner = document.querySelector('.chakra-spinner')
    expect(spinner).toBeInTheDocument()
  })
})
