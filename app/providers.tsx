'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@/contexts/UserContext'
import theme from '@/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>{children}</UserProvider>
    </ChakraProvider>
  )
}
