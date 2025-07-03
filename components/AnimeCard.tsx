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

  return (
    <Box
      bg={cardBg}
      borderRadius="xl"
      overflow="hidden"
      cursor="pointer"
      position="relative"
      transition="all 0.3s ease-in-out"
      boxShadow="lg"
      _hover={{
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: '2xl',
        _before: {
          opacity: 1,
        },
      }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
        zIndex: 1,
        borderRadius: 'xl',
      }}
      onClick={onClick}
    >
      <Box position="relative" overflow="hidden">
        <Image
          src={anime.coverImage.large}
          alt={anime.title.english || anime.title.romaji}
          height="300px"
          width="100%"
          objectFit="cover"
          transition="transform 0.3s ease-in-out"
          _hover={{
            transform: 'scale(1.05)',
          }}
          fallback={
            <Box
              height="300px"
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
            >
              <Text fontWeight="bold">🎌 Anime</Text>
            </Box>
          }
        />
        
        {/* Gradient overlay */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          height="50%"
          background="linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)"
          opacity={0}
          transition="opacity 0.3s ease-in-out"
          _groupHover={{
            opacity: 1,
          }}
        />
      </Box>

      <VStack p={4} spacing={3} align="stretch" position="relative" zIndex={2}>
        <Text
          fontWeight="bold"
          fontSize="md"
          lineHeight="short"
          noOfLines={2}
          minHeight="48px"
          color="gray.800"
        >
          {anime.title.english || anime.title.romaji}
        </Text>

        <HStack justify="space-between" align="center">
          {anime.averageScore && (
            <Badge 
              bg="linear-gradient(45deg, #48bb78, #38a169)"
              color="white"
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="bold"
            >
              ⭐ {anime.averageScore}%
            </Badge>
          )}
        </HStack>

        <HStack wrap="wrap" spacing={1}>
          {anime.genres.slice(0, 3).map((genre, index) => {
            const colors = ['purple', 'blue', 'pink']
            const colorScheme = colors[index % colors.length]
            return (
              <Badge
                key={genre}
                colorScheme={colorScheme}
                variant="subtle"
                fontSize="xs"
                borderRadius="md"
                fontWeight="semibold"
              >
                {genre}
              </Badge>
            )
          })}
          {anime.genres.length > 3 && (
            <Badge 
              bg="linear-gradient(45deg, #667eea, #764ba2)"
              color="white"
              fontSize="xs" 
              borderRadius="md"
              fontWeight="semibold"
            >
              +{anime.genres.length - 3}
            </Badge>
          )}
        </HStack>
      </VStack>
    </Box>
  )
}
