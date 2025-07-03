'use client'

import { Box, Heading, Text, VStack, Alert, AlertIcon, Divider, Container, Button, HStack } from '@chakra-ui/react'
import { useUser } from '@/contexts/UserContext'
import { AnimeGrid } from '@/components/AnimeGrid'

interface HomePageProps {
  currentPage?: number
}

export function HomePage({ currentPage = 1 }: HomePageProps) {
  const { user, isUserSet, openProfile } = useUser()

  return (
    <Box p={{ base: 4, md: 8 }}>
      <Container maxW="container.xl" px={{ base: 2, md: 4 }}>
        <VStack spacing={4} align="start" width="100%">
          <HStack justify="space-between" width="100%" align="center">
            <VStack spacing={1} align="start">
              <Heading>Leonardo.AI Challenge</Heading>
              <Text fontSize="lg" color="gray.600">
                Anime Discovery App{currentPage > 1 ? ` - Page ${currentPage}` : ''}
              </Text>
            </VStack>
            {isUserSet && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={openProfile}
                colorScheme="purple"
              >
                Profile
              </Button>
            )}
          </HStack>

          {isUserSet && user ? (
            <>
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                Welcome back, {user.username}! Here&apos;s your anime catalog.
              </Alert>

              <Divider />

              <Box width="100%">
                <Heading 
                  size="xl" 
                  mb={4}
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
            <Text>
              This app will help you discover amazing anime series using the AniList API.
              Please complete the welcome form to get started.
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  )
}
