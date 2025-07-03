'use client'

import { useQuery } from '@apollo/client'
import { SimpleGrid, Alert, AlertIcon } from '@chakra-ui/react'
import { GET_ANIME_LIST } from '@/graphql/queries'
import { AnimeListResponse } from '@/types/anime'
import { AnimeCard } from './AnimeCard'
import { LoadingSpinner } from './LoadingSpinner'

export function AnimeGrid() {
  const { loading, error, data } = useQuery<AnimeListResponse>(GET_ANIME_LIST, {
    variables: { page: 1, perPage: 20 }
  })

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Failed to load anime: {error.message}
      </Alert>
    )
  }

  const handleAnimeClick = (animeId: number) => {
    // TODO: Open detail modal (Task 8)
    console.log('Anime clicked:', animeId)
  }

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={6}
      width="100%"
    >
      {data?.Page.media.map((anime) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
          onClick={() => handleAnimeClick(anime.id)}
        />
      ))}
    </SimpleGrid>
  )
}
