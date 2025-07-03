'use client'

import { useQuery } from '@apollo/client'
import { Box, Text, VStack, Image, Spinner, Alert, AlertIcon } from '@chakra-ui/react'
import { GET_ANIME_LIST } from '@/graphql/queries'
import { AnimeListResponse } from '@/types/anime'

export function AnimeTestList() {
  const { loading, error, data } = useQuery<AnimeListResponse>(GET_ANIME_LIST, {
    variables: { page: 1, perPage: 5 }
  })

  if (loading) {
    return (
      <Box textAlign="center" p={4}>
        <Spinner size="lg" />
        <Text mt={2}>Loading anime...</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading anime: {error.message}
      </Alert>
    )
  }

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" fontWeight="bold">
        Apollo Client Test - Top 5 Anime
      </Text>

      {data?.Page.media.map((anime) => (
        <Box key={anime.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
          <VStack spacing={2} align="start">
            <Text fontWeight="semibold">
              {anime.title.english || anime.title.romaji}
            </Text>
            <Image
              src={anime.coverImage.large}
              alt={anime.title.romaji}
              width="100px"
              height="140px"
              objectFit="cover"
            />
            <Text fontSize="sm">Score: {anime.averageScore || 'N/A'}</Text>
            <Text fontSize="sm">Genres: {anime.genres.join(', ')}</Text>
          </VStack>
        </Box>
      ))}
    </VStack>
  )
}
