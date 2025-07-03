'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  Box,
  Divider,
  useColorModeValue,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { GET_ANIME_DETAILS } from '@/graphql/queries'
import { LoadingSpinner } from './LoadingSpinner'
import type { AnimeDetailsResponse } from '@/types/anime'

interface AnimeDetailModalProps {
  animeId: number | null
  isOpen: boolean
  onClose: () => void
}

export function AnimeDetailModal({ animeId, isOpen, onClose }: AnimeDetailModalProps) {
  const { loading, error, data } = useQuery<AnimeDetailsResponse>(GET_ANIME_DETAILS, {
    variables: { id: animeId },
    skip: !animeId,
  })

  const textColor = useColorModeValue('gray.600', 'gray.300')

  if (!animeId) return null

  const anime = data?.Media

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(5px)" />
      <ModalContent
        bg="white"
        maxH="90vh"
        borderRadius="2xl"
        boxShadow="2xl"
        border="1px solid"
        borderColor="purple.200"
      >
        <ModalHeader
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          color="white"
          borderTopRadius="2xl"
          fontWeight="bold"
        >
          {anime?.title?.english || anime?.title?.romaji || 'Loading...'}
        </ModalHeader>
        <ModalCloseButton color="white" _hover={{ bg: "whiteAlpha.200" }} />

        <ModalBody p={6}>
          {loading && <LoadingSpinner />}

          {error && (
            <Text color="red.500">
              Failed to load anime details: {error.message}
            </Text>
          )}

          {anime && (
            <Grid templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={6}>
              <GridItem>
                <Image
                  src={anime.coverImage.extraLarge || anime.coverImage.large}
                  alt={anime.title.english || anime.title.romaji}
                  width="100%"
                  borderRadius="lg"
                  fallback={
                    <Box
                      height="400px"
                      bg="gray.200"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="lg"
                    >
                      <Text>No Image</Text>
                    </Box>
                  }
                />
              </GridItem>

              <GridItem>
                <VStack align="stretch" spacing={4}>
                  {/* Basic Info */}
                  <VStack align="stretch" spacing={2}>
                    <Text fontSize="xl" fontWeight="bold">
                      {anime.title.english || anime.title.romaji}
                    </Text>
                    {anime.title.native && (
                      <Text fontSize="md" color={textColor}>
                        {anime.title.native}
                      </Text>
                    )}
                  </VStack>

                  {/* Stats */}
                  <HStack wrap="wrap" spacing={4}>
                    {anime.averageScore && (
                      <Badge colorScheme="green" fontSize="md" p={2}>
                        Score: {anime.averageScore}%
                      </Badge>
                    )}
                    {anime.episodes && (
                      <Badge colorScheme="blue" fontSize="md" p={2}>
                        Episodes: {anime.episodes}
                      </Badge>
                    )}
                    {anime.status && (
                      <Badge colorScheme="purple" fontSize="md" p={2}>
                        {anime.status.replace('_', ' ')}
                      </Badge>
                    )}
                  </HStack>

                  {/* Genres */}
                  {anime.genres && anime.genres.length > 0 && (
                    <VStack align="stretch" spacing={2}>
                      <Text fontWeight="semibold">Genres:</Text>
                      <HStack wrap="wrap" spacing={2}>
                        {anime.genres.map((genre) => (
                          <Badge
                            key={genre}
                            variant="outline"
                            colorScheme="blue"
                          >
                            {genre}
                          </Badge>
                        ))}
                      </HStack>
                    </VStack>
                  )}

                  {/* Description */}
                  {anime.description && (
                    <VStack align="stretch" spacing={2}>
                      <Text fontWeight="semibold">Description:</Text>
                      <Text
                        fontSize="sm"
                        color={textColor}
                        dangerouslySetInnerHTML={{
                          __html: anime.description.replace(/<br\s*\/?>/gi, '\n'),
                        }}
                        whiteSpace="pre-wrap"
                        noOfLines={6}
                      />
                    </VStack>
                  )}

                  <Divider />

                  {/* Additional Info */}
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    {anime.format && (
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="semibold">Format:</Text>
                        <Text fontSize="sm" color={textColor}>
                          {anime.format.replace('_', ' ')}
                        </Text>
                      </VStack>
                    )}
                    {anime.season && anime.seasonYear && (
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="semibold">Season:</Text>
                        <Text fontSize="sm" color={textColor}>
                          {anime.season} {anime.seasonYear}
                        </Text>
                      </VStack>
                    )}
                    {anime.source && (
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="semibold">Source:</Text>
                        <Text fontSize="sm" color={textColor}>
                          {anime.source.replace('_', ' ')}
                        </Text>
                      </VStack>
                    )}
                    {anime.duration && (
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="semibold">Duration:</Text>
                        <Text fontSize="sm" color={textColor}>
                          {anime.duration} min
                        </Text>
                      </VStack>
                    )}
                  </Grid>
                </VStack>
              </GridItem>
            </Grid>
          )}
        </ModalBody>

        <ModalFooter bg="gray.50" borderBottomRadius="2xl">
          <Button
            onClick={onClose}
            bg="linear-gradient(45deg, #667eea, #764ba2)"
            color="white"
            _hover={{
              bg: "linear-gradient(45deg, #5a67d8, #6b46c1)",
              transform: "translateY(-1px)",
              boxShadow: "lg",
            }}
            borderRadius="full"
            px={8}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
