import React from 'react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { renderWithChakra, screen } from '@/test/test-utils'
import { UserProfile } from '@/components/UserProfile'
import { User } from '@/types/user'

const mockUser: User = {
  username: 'testuser',
  jobTitle: 'Developer'
}

describe('UserProfile', () => {
  it('displays user information correctly', () => {
    const mockOnEdit = vi.fn()

    renderWithChakra(
      <UserProfile user={mockUser} onEdit={mockOnEdit} />
    )

    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Job Title')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /edit information/i })).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', async () => {
    const mockOnEdit = vi.fn()
    const user = userEvent.setup()

    renderWithChakra(
      <UserProfile user={mockUser} onEdit={mockOnEdit} />
    )

    const editButton = screen.getByRole('button', { name: /edit information/i })
    await user.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })
})
