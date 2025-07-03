import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@/contexts/UserContext'

// Wrapper for Chakra UI provider
const ChakraWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>
}

// Wrapper for both Chakra UI and User Context providers
const AllProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </ChakraProvider>
  )
}

// Render with just Chakra UI provider
export const renderWithChakra = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: ChakraWrapper, ...options })

// Render with both Chakra UI and User Context providers
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProvidersWrapper, ...options })

// Re-export everything from React Testing Library
export * from '@testing-library/react'
