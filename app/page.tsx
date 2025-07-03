'use client'

import { Box, Heading, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react'
import { useUser } from '@/contexts/UserContext'

export default function HomePage() {
  const { user, isUserSet } = useUser()

  return (
    <Box p={8}>
      <VStack spacing={6} align="start">
        <Heading>Leonardo.AI Challenge</Heading>
        <Text fontSize="lg" color="gray.600">
          Anime Discovery App
        </Text>
        
        {isUserSet && user && (
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            Welcome back, {user.username}! You can now access the anime catalog.
          </Alert>
        )}
        
        <Text>
          This app will help you discover amazing anime series using the AniList API.
          {!isUserSet && ' Please complete the welcome form to get started.'}
        </Text>
      </VStack>
    </Box>
  )
}
