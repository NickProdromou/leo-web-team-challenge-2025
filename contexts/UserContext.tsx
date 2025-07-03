'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, UserContextType } from '@/types/user'
import { userStorage } from '@/utils/localStorage'

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  useEffect(() => {
    const storedUser = userStorage.get()
    setUserState(storedUser)
    setIsLoaded(true)
  }, [])

  const setUser = (newUser: User) => {
    setUserState(newUser)
    userStorage.set(newUser)
  }

  const clearUser = () => {
    setUserState(null)
    userStorage.clear()
  }

  const openProfile = () => {
    setIsProfileOpen(true)
  }

  const closeProfile = () => {
    setIsProfileOpen(false)
  }

  const value: UserContextType = {
    user,
    setUser,
    clearUser,
    isUserSet: Boolean(user?.username && user?.jobTitle),
    isProfileOpen,
    openProfile,
    closeProfile,
  }

  if (!isLoaded) {
    return null // Prevent hydration mismatch
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
