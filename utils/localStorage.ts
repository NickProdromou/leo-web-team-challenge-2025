import { User } from '@/types/user'

const USER_STORAGE_KEY = 'leonardo-challenge-user'

export const userStorage = {
  get: (): User | null => {
    if (typeof window === 'undefined') return null
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  },

  set: (user: User): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    } catch {
      // Silent fail
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(USER_STORAGE_KEY)
    } catch {
      // Silent fail
    }
  },
}
