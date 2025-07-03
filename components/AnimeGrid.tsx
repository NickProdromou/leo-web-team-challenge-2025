'use client'

import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { SimpleGrid, Alert, AlertIcon, VStack, HStack, Button, Text } from '@chakra-ui/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { GET_ANIME_LIST } from '@/graphql/queries'
import { AnimeListResponse } from '@/types/anime'
import { AnimeCard } from './AnimeCard'
import { LoadingSpinner } from './LoadingSpinner'
import { AnimeDetailModal } from './AnimeDetailModal'

const ITEMS_PER_PAGE = 20

export function AnimeGrid() {
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const { loading, error, data } = useQuery<AnimeListResponse>(GET_ANIME_LIST, {
    variables: { page: currentPage, perPage: ITEMS_PER_PAGE }
  })

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    const newUrl = params.toString() ? `/?${params.toString()}` : '/'
    router.push(newUrl)
  }

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
    setSelectedAnimeId(animeId)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedAnimeId(null)
  }

  const pageInfo = data?.Page.pageInfo
  const animeList = data?.Page.media || []

  // Empty state when no anime found
  if (!loading && animeList.length === 0) {
    return (
      <VStack
        spacing={8}
        width="100%"
        py={12}
        align="center"
      >
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.500">
            No anime found
          </Text>
          <Text fontSize="md" color="gray.400" textAlign="center">
            This page doesn't have any anime content.
            {currentPage > 1 && " Try going back to an earlier page."}
          </Text>
        </VStack>

        {currentPage > 1 && (
          <HStack spacing={4}>
            <Button
              onClick={() => goToPage(1)}
              variant="outline"
              colorScheme="blue"
            >
              Go to First Page
            </Button>
            <Button
              onClick={() => goToPage(currentPage - 1)}
              variant="outline"
            >
              Previous Page
            </Button>
          </HStack>
        )}
      </VStack>
    )
  }

  return (
    <VStack spacing={8} width="100%">
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        spacing={6}
        width="100%"
      >
        {animeList.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onClick={() => handleAnimeClick(anime.id)}
          />
        ))}
      </SimpleGrid>

      {pageInfo && (
        <HStack spacing={4} justify="center">
          <Button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            variant="outline"
          >
            Previous
          </Button>

          <Text>
            Page {currentPage}
          </Text>

          <Button
            onClick={() => goToPage(currentPage + 1)}
            disabled={!pageInfo?.hasNextPage}
            variant="outline"
          >
            Next
          </Button>
        </HStack>
      )}

      <AnimeDetailModal
        animeId={selectedAnimeId}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </VStack>
  )
}
