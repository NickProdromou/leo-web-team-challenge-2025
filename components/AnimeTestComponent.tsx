'use client'

import { useQuery } from '@apollo/client'
import { Box, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react'
import { GET_ANIME_LIST } from '@/graphql/queries'
import { AnimeListResponse } from '@/types/anime'

export function AnimeTestComponent() {
  const { loading, error, data } = useQuery<AnimeListResponse>(GET_ANIME_LIST, {
    variables: { page: 1, perPage: 5 },
  })

  if (loading) {
    return (
      <Box display="flex" alignItems="center" gap={2}>
        <Spinner size="sm" />
        <Text>Testing Apollo Client connection...</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Apollo Client Error: {error.message}
      </Alert>
    )
  }

  if (data?.Page?.media) {
    return (
      <Alert status="success">
        <AlertIcon />
        ✅ Apollo Client working! Loaded {data.Page.media.length} anime from AniList API
      </Alert>
    )
  }

  return <Text>No data received</Text>
}
