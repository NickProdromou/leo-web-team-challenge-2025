'use client'

import { Box, Text, VStack, Alert, AlertIcon, Container, Heading } from '@chakra-ui/react'
import { useUser } from '@/contexts/UserContext'
import { AnimeGrid } from '@/components/AnimeGrid'

interface HomePageProps {
  currentPage?: number
}

export function HomePage({ currentPage = 1 }: HomePageProps) {
  const { user, isUserSet } = useUser()

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Container maxW="container.xl" px={{ base: 2, md: 4 }}>
        <VStack spacing={6} align="stretch" width="100%">
          {isUserSet && user ? (
            <>
              <Alert
                status="success"
                borderRadius="lg"
                bg="green.50"
                border="1px solid"
                borderColor="green.200"
              >
                <AlertIcon />
                Welcome back, {user.username}! Here&apos;s your anime catalog.
              </Alert>

              <Box width="100%">
                <Heading
                  size="xl"
                  mb={6}
                  textAlign="center"
                  bgGradient="linear(to-r, #C54E71, #7962AD)"
                  bgClip="text"
                  fontWeight="bold"
                >
                  Popular Anime Collection 🌸
                </Heading>
                <AnimeGrid currentPage={currentPage} />
              </Box>
            </>
          ) : (
            <VStack spacing={4} align="center" py={16}>
              <Heading
                size="lg"
                textAlign="center"
                bgGradient="linear(to-r, #667eea, #764ba2)"
                bgClip="text"
                fontWeight="bold"
              >
                Welcome to Anime Discovery
              </Heading>
              <Text fontSize="lg" textAlign="center" color="gray.600" maxW="md">
                Discover amazing anime series using the AniList API.
                Please complete the welcome form to get started exploring!
              </Text>
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  )
}
