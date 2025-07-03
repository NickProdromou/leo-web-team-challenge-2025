export interface User {
  username: string
  jobTitle: string
}

export interface UserContextType {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
  isUserSet: boolean
}
