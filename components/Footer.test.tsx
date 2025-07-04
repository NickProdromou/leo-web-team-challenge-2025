import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderWithChakra, screen } from '@/test/test-utils'
import { Footer } from '@/components/Footer'

describe('Footer', () => {
  it('displays the challenge version', () => {
    renderWithChakra(<Footer />)
    
    expect(screen.getByText(/Challenge Version v3\.5/i)).toBeInTheDocument()
  })
  
  it('renders as a footer element', () => {
    renderWithChakra(<Footer />)
    
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toBeInTheDocument()
  })
})
