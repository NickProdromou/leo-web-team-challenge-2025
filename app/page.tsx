'use client'

import { Box, Heading, Text, VStack, Alert, AlertIcon, Divider } from '@chakra-ui/react'
import { useUser } from '@/contexts/UserContext'
import { AnimeGrid } from '@/components/AnimeGrid'

export default function HomePage() {
  const { user, isUserSet } = useUser()

  return (
    <Box p={8}>
      <VStack spacing={6} align="start" width="100%">
        <Heading>Leonardo.AI Challenge</Heading>
        <Text fontSize="lg" color="gray.600">
          Anime Discovery App
        </Text>

        {isUserSet && user ? (
          <>
            <Alert status="success" borderRadius="md">
              <AlertIcon />
              Welcome back, {user.username}! Here's your anime catalog.
            </Alert>
            
            <Divider />
            
            <Box width="100%">
              <Heading size="lg" mb={4}>Popular Anime</Heading>
              <AnimeGrid />
            </Box>
          </>
        ) : (
          <Text>
            This app will help you discover amazing anime series using the AniList API.
            Please complete the welcome form to get started.
          </Text>
        )}
      </VStack>
    </Box>
  )
}
