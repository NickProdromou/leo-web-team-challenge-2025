'use client'

import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react'
import { useUser } from '@/contexts/UserContext'

export default function HomePage() {
  const { user, setUser, clearUser, isUserSet } = useUser()

  const testSetUser = () => {
    setUser({ username: 'testuser', jobTitle: 'Developer' })
  }

  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading>Leonardo.AI Challenge</Heading>
        <Text>Anime Discovery App</Text>
        
        {isUserSet ? (
          <Box>
            <Text>Welcome, {user?.username}!</Text>
            <Text>Job: {user?.jobTitle}</Text>
            <Button onClick={clearUser}>Clear User</Button>
          </Box>
        ) : (
          <Box>
            <Text>No user set</Text>
            <Button colorScheme="blue" onClick={testSetUser}>
              Test Set User
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  )
}
