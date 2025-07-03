import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProfile } from '@/components/UserProfile'
import { User } from '@/types/user'

const mockUser: User = {
  username: 'testuser',
  jobTitle: 'Developer'
}

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ChakraProvider>
      {component}
    </ChakraProvider>
  )
}

describe('UserProfile', () => {
  it('displays user information correctly', () => {
    const mockOnEdit = vi.fn()
    
    renderWithProviders(
      <UserProfile user={mockUser} onEdit={mockOnEdit} />
    )
    
    expect(screen.getByText('Your Information')).toBeInTheDocument()
    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /edit information/i })).toBeInTheDocument()
  })
  
  it('calls onEdit when edit button is clicked', async () => {
    const mockOnEdit = vi.fn()
    const user = userEvent.setup()
    
    renderWithProviders(
      <UserProfile user={mockUser} onEdit={mockOnEdit} />
    )
    
    const editButton = screen.getByRole('button', { name: /edit information/i })
    await user.click(editButton)
    
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })
})
