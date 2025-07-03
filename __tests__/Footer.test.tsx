import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ChakraProvider } from '@chakra-ui/react'
import { Footer } from '@/components/Footer'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ChakraProvider>
      {component}
    </ChakraProvider>
  )
}

describe('Footer', () => {
  it('displays the challenge version', () => {
    renderWithProviders(<Footer />)
    
    expect(screen.getByText(/Challenge Version: v3\.5/i)).toBeInTheDocument()
    expect(screen.getByText(/leonardo\.ai/i)).toBeInTheDocument()
  })
  
  it('renders as a footer element', () => {
    renderWithProviders(<Footer />)
    
    const footerElement = screen.getByRole('contentinfo')
    expect(footerElement).toBeInTheDocument()
  })
})
