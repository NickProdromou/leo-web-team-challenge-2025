'use client'

import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { SimpleGrid, Alert, AlertIcon, VStack, HStack, Button, Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { GET_ANIME_LIST } from '@/graphql/queries'
import { AnimeListResponse } from '@/types/anime'
import { AnimeCard } from './AnimeCard'
import { LoadingSpinner } from './LoadingSpinner'
import { AnimeDetailModal } from './AnimeDetailModal'

const ITEMS_PER_PAGE = 20

interface AnimeGridProps {
  currentPage?: number
}

export function AnimeGrid({ currentPage }: AnimeGridProps) {
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()

  // Always use the prop-based approach with dynamic routing
  const pageNumber = currentPage || 1

  const { loading, error, data } = useQuery<AnimeListResponse>(GET_ANIME_LIST, {
    variables: { page: pageNumber, perPage: ITEMS_PER_PAGE }
  })

  const goToPage = (page: number) => {
    if (page === 1) {
      router.push('/')
    } else {
      router.push(`/page/${page}`)
    }
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="200px"
        maxH="300px"
        my={4}
      >
        <Box
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          p={6}
          textAlign="center"
          maxW="400px"
          bgGradient="linear(to-br, white, #f5f7fa)"
        >
          <VStack spacing={4}>
            <Text fontSize="3xl">🔍</Text>
            <VStack spacing={2}>
              <Text fontSize="lg" fontWeight="bold" color="gray.700">
                No anime found
              </Text>
              <Text fontSize="sm" color="gray.500" lineHeight="tall">
                This page doesn&apos;t have any anime content.
                {pageNumber > 1 && " Try going back to an earlier page."}
              </Text>
            </VStack>

            {pageNumber > 1 && (
              <HStack spacing={4} pt={2}>
                <Button
                  onClick={() => goToPage(1)}
                  bg="linear-gradient(45deg, #E178B0, #CB5F9E)"
                  color="white"
                  _hover={{
                    bg: "linear-gradient(45deg, #E68D9F, #C54E71)",
                    transform: "translateY(-1px)",
                    boxShadow: "lg",
                  }}
                  borderRadius="full"
                  px={6}
                  size="sm"
                >
                  Go to First Page
                </Button>
                <Button
                  onClick={() => goToPage(pageNumber - 1)}
                  variant="outline"
                  borderColor="#7962AD"
                  color="#7962AD"
                  _hover={{
                    bg: "#F6D5E9",
                    borderColor: "#C54E71",
                  }}
                  borderRadius="full"
                  px={6}
                  size="sm"
                >
                  Previous Page
                </Button>
              </HStack>
            )}
          </VStack>
        </Box>
      </Box>
    )
  }

  return (
    <VStack spacing={4} width="100%">
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
        <HStack spacing={6} justify="center" py={4}>
          <Button
            onClick={() => goToPage(pageNumber - 1)}
            disabled={pageNumber <= 1}
            bg="linear-gradient(45deg, #C54E71, #7962AD)"
            color="white"
            _hover={{
              bg: "linear-gradient(45deg, #A280CE, #51246E)",
              transform: "translateY(-1px)",
              boxShadow: "lg",
            }}
            _disabled={{
              bg: "gray.300",
              color: "gray.500",
              cursor: "not-allowed",
              _hover: {
                bg: "gray.300",
                transform: "none",
                boxShadow: "none",
              },
            }}
            leftIcon={<span>⬅️</span>}
            borderRadius="full"
            px={6}
          >
            Previous
          </Button>

          <Box
            bg="#FFF5F4"
            px={6}
            py={3}
            borderRadius="full"
            boxShadow="md"
            border="2px solid"
            borderColor="#E68D9F"
          >
            <Text
              fontWeight="bold"
              bgGradient="linear(to-r, #C54E71, #7962AD)"
              bgClip="text"
              fontSize="lg"
            >
              Page {pageNumber}
            </Text>
          </Box>

          <Button
            onClick={() => goToPage(pageNumber + 1)}
            disabled={!pageInfo?.hasNextPage}
            bg="linear-gradient(45deg, #C54E71, #7962AD)"
            color="white"
            _hover={{
              bg: "linear-gradient(45deg, #A280CE, #51246E)",
              transform: "translateY(-1px)",
              boxShadow: "lg",
            }}
            _disabled={{
              bg: "gray.300",
              color: "gray.500",
              cursor: "not-allowed",
              _hover: {
                bg: "gray.300",
                transform: "none",
                boxShadow: "none",
              },
            }}
            rightIcon={<span>➡️</span>}
            borderRadius="full"
            px={6}
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
