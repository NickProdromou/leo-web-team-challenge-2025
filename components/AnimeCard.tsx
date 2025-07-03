'use client'

import {
  Box,
  Image,
  Text,
  VStack,
  Badge,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { AnimeListItem } from '@/types/anime'

interface AnimeCardProps {
  anime: AnimeListItem
  onClick: () => void
}

export function AnimeCard({ anime, onClick }: AnimeCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
        borderColor: 'blue.300',
      }}
      onClick={onClick}
    >
      <Image
        src={anime.coverImage.large}
        alt={anime.title.english || anime.title.romaji}
        height="300px"
        width="100%"
        objectFit="cover"
        fallback={
          <Box
            height="300px"
            bg="gray.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text>No Image</Text>
          </Box>
        }
      />

      <VStack p={4} spacing={3} align="stretch">
        <Text
          fontWeight="semibold"
          fontSize="md"
          lineHeight="short"
          noOfLines={2}
          minHeight="48px"
        >
          {anime.title.english || anime.title.romaji}
        </Text>

        <HStack justify="space-between" align="center">
          {anime.averageScore && (
            <Badge colorScheme="green" fontSize="sm">
              {anime.averageScore}%
            </Badge>
          )}
        </HStack>

        <HStack wrap="wrap" spacing={1}>
          {anime.genres.slice(0, 3).map((genre) => (
            <Badge
              key={genre}
              variant="outline"
              fontSize="xs"
              colorScheme="blue"
            >
              {genre}
            </Badge>
          ))}
          {anime.genres.length > 3 && (
            <Badge variant="outline" fontSize="xs" colorScheme="gray">
              +{anime.genres.length - 3}
            </Badge>
          )}
        </HStack>
      </VStack>
    </Box>
  )
}
