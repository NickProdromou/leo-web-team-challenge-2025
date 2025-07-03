import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithChakra, screen } from './test-utils'
import { UserInfoForm } from '@/components/UserInfoForm'
import { User } from '@/types/user'

describe('UserInfoForm', () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form fields correctly', () => {
    renderWithChakra(<UserInfoForm onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/job title/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup()
    renderWithChakra(<UserInfoForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', { name: /continue/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/username must be at least 2 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/job title must be at least 2 characters/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('shows validation error for short username', async () => {
    const user = userEvent.setup()
    renderWithChakra(<UserInfoForm onSubmit={mockOnSubmit} />)

    const usernameInput = screen.getByLabelText(/username/i)
    const submitButton = screen.getByRole('button', { name: /continue/i })

    await user.type(usernameInput, 'a')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/username must be at least 2 characters/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('shows validation error for short job title', async () => {
    const user = userEvent.setup()
    renderWithChakra(<UserInfoForm onSubmit={mockOnSubmit} />)

    const jobTitleInput = screen.getByLabelText(/job title/i)
    const submitButton = screen.getByRole('button', { name: /continue/i })

    await user.type(jobTitleInput, 'x')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/job title must be at least 2 characters/i)).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    renderWithChakra(<UserInfoForm onSubmit={mockOnSubmit} />)

    const usernameInput = screen.getByLabelText(/username/i)
    const jobTitleInput = screen.getByLabelText(/job title/i)
    const submitButton = screen.getByRole('button', { name: /continue/i })

    await user.type(usernameInput, 'john_doe')
    await user.type(jobTitleInput, 'Software Developer')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        username: 'john_doe',
        jobTitle: 'Software Developer'
      })
    })
  })

  it('pre-fills form with initial data', () => {
    const initialData: User = {
      username: 'existing_user',
      jobTitle: 'Senior Developer'
    }

    renderWithChakra(<UserInfoForm onSubmit={mockOnSubmit} initialData={initialData} />)

    expect(screen.getByDisplayValue('existing_user')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Senior Developer')).toBeInTheDocument()
  })

  it('shows loading state when isLoading is true', () => {
    renderWithChakra(<UserInfoForm onSubmit={mockOnSubmit} isLoading={true} />)

    const submitButton = screen.getByRole('button', { name: /continue/i })
    expect(submitButton).toBeDisabled()
  })

  it('shows cancel button when onCancel is provided', async () => {
    const user = userEvent.setup()
    renderWithChakra(<UserInfoForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    expect(cancelButton).toBeInTheDocument()

    await user.click(cancelButton)
    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('clears validation errors when user starts typing', async () => {
    const user = userEvent.setup()
    renderWithChakra(<UserInfoForm onSubmit={mockOnSubmit} />)

    const usernameInput = screen.getByLabelText(/username/i)
    const submitButton = screen.getByRole('button', { name: /continue/i })

    // Trigger validation error
    await user.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText(/username must be at least 2 characters/i)).toBeInTheDocument()
    })

    // Start typing to clear error
    await user.type(usernameInput, 'valid_username')
    await waitFor(() => {
      expect(screen.queryByText(/username must be at least 2 characters/i)).not.toBeInTheDocument()
    })
  })
})
