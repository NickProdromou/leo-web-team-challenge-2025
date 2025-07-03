import { describe, it, expect, beforeEach, vi } from 'vitest'
import { userStorage } from '@/utils/localStorage'
import { User } from '@/types/user'

const mockUser: User = {
  username: 'testuser',
  jobTitle: 'Developer'
}

describe('userStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('sets user data in localStorage', () => {
    userStorage.set(mockUser)
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'leonardo-challenge-user',
      JSON.stringify(mockUser)
    )
  })

  it('gets user data from localStorage', () => {
    localStorage.getItem = vi.fn().mockReturnValue(JSON.stringify(mockUser))
    
    const result = userStorage.get()
    
    expect(localStorage.getItem).toHaveBeenCalledWith('leonardo-challenge-user')
    expect(result).toEqual(mockUser)
  })

  it('returns null when localStorage is empty', () => {
    localStorage.getItem = vi.fn().mockReturnValue(null)
    
    const result = userStorage.get()
    
    expect(result).toBeNull()
  })

  it('returns null when localStorage contains invalid JSON', () => {
    localStorage.getItem = vi.fn().mockReturnValue('invalid-json')
    
    const result = userStorage.get()
    
    expect(result).toBeNull()
  })

  it('clears user data from localStorage', () => {
    userStorage.clear()
    
    expect(localStorage.removeItem).toHaveBeenCalledWith('leonardo-challenge-user')
  })
})
