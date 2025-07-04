import React from 'react'
import { renderWithChakra, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Header } from '@/components/Header'
import { User } from '@/types/user'

// Mock the useUser hook
const mockUseUser = vi.fn()

vi.mock('@/contexts/UserContext', () => ({
  useUser: () => mockUseUser(),
}))

const mockUser: User = {
  username: 'testuser',
  jobTitle: 'Developer'
}

const mockUserContextWithUser = {
  user: mockUser,
  setUser: vi.fn(),
  clearUser: vi.fn(),
  isUserSet: true,
  openProfile: vi.fn(),
  closeProfile: vi.fn(),
  isProfileOpen: false,
}

const mockUserContextWithoutUser = {
  user: null,
  setUser: vi.fn(),
  clearUser: vi.fn(),
  isUserSet: false,
  openProfile: vi.fn(),
  closeProfile: vi.fn(),
  isProfileOpen: false,
}

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Set default mock return value
    mockUseUser.mockReturnValue(mockUserContextWithUser)
  })

  it('renders Anime Discovery App title', () => {
    renderWithChakra(<Header />)

    expect(screen.getByText('Anime Discovery App')).toBeInTheDocument()
  })

  it('displays current page number when provided', () => {
    renderWithChakra(<Header currentPage={3} />)

    expect(screen.getByText('Page 3')).toBeInTheDocument()
  })

  it('does not display page number when currentPage is 1', () => {
    renderWithChakra(<Header currentPage={1} />)

    expect(screen.getByText('Anime Discovery App')).toBeInTheDocument()
    expect(screen.queryByText('Page 1')).not.toBeInTheDocument()
  })

  it('displays welcome message and profile button when user is set', () => {
    renderWithChakra(<Header />)

    expect(screen.getByText('Welcome, testuser')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument()
  })

  it('does not display user info when user is not set', () => {
    mockUseUser.mockReturnValue(mockUserContextWithoutUser)

    renderWithChakra(<Header />)

    expect(screen.queryByText('Welcome, testuser')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Profile' })).not.toBeInTheDocument()
  })

  it('calls openProfile when profile button is clicked', async () => {
    const mockOpenProfile = vi.fn()
    const contextWithMockOpenProfile = {
      ...mockUserContextWithUser,
      openProfile: mockOpenProfile,
    }
    mockUseUser.mockReturnValue(contextWithMockOpenProfile)

    const user = userEvent.setup()
    renderWithChakra(<Header />)

    const profileButton = screen.getByRole('button', { name: 'Profile' })
    await user.click(profileButton)

    expect(mockOpenProfile).toHaveBeenCalledTimes(1)
  })

  it('renders correctly without current page prop', () => {
    renderWithChakra(<Header />)

    expect(screen.getByText('Anime Discovery App')).toBeInTheDocument()
  })

  it('makes app title a link to the home page', () => {
    renderWithChakra(<Header />)

    const appTitle = screen.getByText('Anime Discovery App')
    const link = appTitle.closest('a')
    
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
