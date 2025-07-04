import React from 'react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithChakra, screen } from '@/test/test-utils'
import Error from './error'

// Mock window.location
const mockAssign = vi.fn()
Object.defineProperty(window, 'location', {
  value: {
    href: '',
    assign: mockAssign,
  },
  writable: true,
})

describe('Error Page', () => {
  const mockReset = vi.fn()
  const mockError = {
    name: 'Error',
    message: 'Test error',
    stack: 'Error: Test error\n    at test',
    digest: 'test-digest'
  } as Error & { digest?: string }

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset console.error mock
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('renders error message and buttons correctly', () => {
    renderWithChakra(<Error error={mockError} reset={mockReset} />)

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
    expect(screen.getByText("Don't worry, this happens sometimes")).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument()
  })

  it('calls reset function when Try Again button is clicked', async () => {
    const user = userEvent.setup()
    renderWithChakra(<Error error={mockError} reset={mockReset} />)

    const tryAgainButton = screen.getByRole('button', { name: /try again/i })
    await user.click(tryAgainButton)

    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('navigates to home when Go Home button is clicked', async () => {
    const user = userEvent.setup()
    renderWithChakra(<Error error={mockError} reset={mockReset} />)

    const goHomeButton = screen.getByRole('button', { name: /go home/i })
    await user.click(goHomeButton)

    expect(window.location.href).toBe('/')
  })

  it('logs error to console on mount', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    renderWithChakra(<Error error={mockError} reset={mockReset} />)

    expect(consoleSpy).toHaveBeenCalledWith('App error:', mockError)
    
    consoleSpy.mockRestore()
  })

  it('displays error emoji', () => {
    renderWithChakra(<Error error={mockError} reset={mockReset} />)

    expect(screen.getByText('😵')).toBeInTheDocument()
  })
})
