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
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box
      as="footer"
      bg={bgColor}
      borderTop="1px"
      borderColor={borderColor}
      mt={16}
      py={8}
    >
      <Container maxW="container.xl">
        <VStack spacing={4}>
          <HStack spacing={8} wrap="wrap" justify="center">
            <Text fontSize="sm" color={textColor}>
              Built with Next.js, TypeScript & Chakra UI
            </Text>
            <Text fontSize="sm" color={textColor}>
              Data from{' '}
              <Link 
                href="https://anilist.co" 
                isExternal 
                color="blue.500"
                _hover={{ textDecoration: 'underline' }}
              >
                AniList API
              </Link>
            </Text>
          </HStack>
          
          <Divider />
          
          <VStack spacing={2}>
            <Text fontSize="sm" color={textColor} fontWeight="semibold">
              Leonardo.AI Frontend Challenge
            </Text>
            <Text fontSize="xs" color={textColor}>
              Challenge Version: v1.0.0 • Implementation: July 2025
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}
