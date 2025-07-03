'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@/contexts/UserContext'
import { apolloClient } from '@/lib/apollo-client'
import theme from '@/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
        <UserProvider>{children}</UserProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}
