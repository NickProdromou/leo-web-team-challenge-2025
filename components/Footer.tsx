'use client'

import {
  Box,
  Container,
  Text,
  HStack,
  VStack,
  Link,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'

export function Footer() {
  const bgColor = 'linear-gradient(135deg, #433E5E 0%, #7962AD 50%, #C54E71 100%)'
  const textColor = 'white'

  return (
    <Box
      as="footer"
      background={bgColor}
      mt={16}
      py={8}
      color={textColor}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      }}
    >
      <Container maxW="container.xl">
        <VStack spacing={4}>
          <HStack spacing={8} wrap="wrap" justify="center">
            <Text fontSize="sm" opacity={0.9}>
              Built with Next.js, TypeScript & Chakra UI ⚡
            </Text>
            <Text fontSize="sm" opacity={0.9}>
              Data from{' '}
              <Link
                href="https://anilist.co"
                isExternal
                color="#FBC5F5"
                fontWeight="semibold"
                _hover={{ 
                  textDecoration: 'underline',
                  color: '#DFAAAC',
                }}
              >
                AniList API 🎌
              </Link>
            </Text>
          </HStack>

          <Divider opacity={0.3} />

          <VStack spacing={2}>
            <Text fontSize="sm" fontWeight="bold" opacity={0.95}>
              🎨 Leonardo.AI Frontend Challenge
            </Text>
            <Text fontSize="xs" opacity={0.8}>
              Challenge Version: v3.5 • Implementation: July 2025 ✨
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}
