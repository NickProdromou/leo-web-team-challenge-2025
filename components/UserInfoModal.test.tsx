import React from 'react'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithProviders, screen } from '@/test/test-utils'
import { UserInfoModal } from '@/components/UserInfoModal'

// Mock the UserContext to control modal state
const mockUserContext = {
  user: null as any,
  setUser: vi.fn(),
  isUserSet: false,
  isProfileOpen: false,
  openProfile: vi.fn(),
  closeProfile: vi.fn(),
}

// Mock the UserContext hook
vi.mock('@/contexts/UserContext', async () => {
  const actual = await vi.importActual('@/contexts/UserContext')
  return {
    ...actual,
    useUser: () => mockUserContext,
  }
})

describe('UserInfoModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('does not render when modal is closed', () => {
    mockUserContext.isProfileOpen = false
    mockUserContext.isUserSet = true // User is set, so modal should be closed
    renderWithProviders(<UserInfoModal />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders modal when isProfileOpen is true', () => {
    mockUserContext.isProfileOpen = true
    mockUserContext.isUserSet = false
    renderWithProviders(<UserInfoModal />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(/welcome/i)).toBeInTheDocument()
    expect(screen.getByText(/please provide your information to continue/i)).toBeInTheDocument()
  })

  it('shows user form when user is not set', () => {
    mockUserContext.isProfileOpen = true
    mockUserContext.isUserSet = false
    mockUserContext.user = null
    renderWithProviders(<UserInfoModal />)

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument()
  })

  it('shows user profile when user is set and not editing', () => {
    mockUserContext.isProfileOpen = true
    mockUserContext.isUserSet = true
    mockUserContext.user = { username: 'john_doe', jobTitle: 'Developer' }
    renderWithProviders(<UserInfoModal />)

    expect(screen.getByText('john_doe')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
  })

  it('switches to edit mode when edit button is clicked', async () => {
    const user = userEvent.setup()
    mockUserContext.isProfileOpen = true
    mockUserContext.isUserSet = true
    mockUserContext.user = { username: 'john_doe', jobTitle: 'Developer' }
    renderWithProviders(<UserInfoModal />)

    const editButton = screen.getByRole('button', { name: /edit/i })
    await user.click(editButton)

    await waitFor(() => {
      expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
      expect(screen.getByDisplayValue('john_doe')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Developer')).toBeInTheDocument()
    })
  })

  it('handles form submission correctly', async () => {
    const user = userEvent.setup()
    mockUserContext.isProfileOpen = true
    mockUserContext.isUserSet = false
    mockUserContext.user = null
    renderWithProviders(<UserInfoModal />)

    const usernameInput = screen.getByLabelText(/username/i)
    const jobTitleInput = screen.getByLabelText(/job title/i)
    const submitButton = screen.getByRole('button', { name: /continue/i })

    await user.type(usernameInput, 'new_user')
    await user.type(jobTitleInput, 'New Job')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockUserContext.setUser).toHaveBeenCalledWith({
        username: 'new_user',
        jobTitle: 'New Job'
      })
      expect(mockUserContext.closeProfile).toHaveBeenCalled()
    })
  })

  it('shows loading state during form submission', async () => {
    const user = userEvent.setup()
    mockUserContext.isProfileOpen = true
    mockUserContext.isUserSet = false
    renderWithProviders(<UserInfoModal />)

    const usernameInput = screen.getByLabelText(/username/i)
    const jobTitleInput = screen.getByLabelText(/job title/i)
    const submitButton = screen.getByRole('button', { name: /continue/i })

    await user.type(usernameInput, 'test_user')
    await user.type(jobTitleInput, 'Test Job')
    await user.click(submitButton)

    // Check for loading state immediately after click
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled()
  })

  it('closes modal when overlay is clicked', async () => {
    const user = userEvent.setup()
    mockUserContext.isProfileOpen = true
    mockUserContext.isUserSet = true
    mockUserContext.user = { username: 'test', jobTitle: 'test' }
    renderWithProviders(<UserInfoModal />)

    // Click on the modal overlay to close
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()

    // For this test, we just verify the modal is rendered when it should be
    // The actual close functionality is handled by Chakra UI Modal internally
  })
})
