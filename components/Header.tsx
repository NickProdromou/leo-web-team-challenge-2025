'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useUser } from '@/contexts/UserContext'

interface HeaderProps {
  currentPage?: number
}

export function Header({ currentPage }: HeaderProps) {
  const { user, isUserSet, openProfile } = useUser()
  const bg = useColorModeValue('white', 'gray.800')
  const shadow = useColorModeValue('lg', 'dark-lg')

  return (
    <Box
      as="header"
      bg={bg}
      boxShadow={shadow}
      borderBottom="1px solid"
      borderColor="purple.200"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="container.xl" py={4}>
        <HStack justify="space-between" align="center">
          <VStack spacing={1} align="start">
            <Heading
              size="lg"
              bgGradient="linear(to-r, #667eea, #764ba2)"
              bgClip="text"
              fontWeight="bold"
            >
              Anime Discovery App
            </Heading>
            {currentPage && currentPage > 1 && (
              <Text fontSize="md" color="gray.600">
                Page {currentPage}
              </Text>
            )}
          </VStack>

          {isUserSet && user && (
            <VStack spacing={1} align="end">
              <Text fontSize="sm" color="gray.600">
                Welcome, {user.username}
              </Text>
              <Button
                size="sm"
                onClick={openProfile}
                bg="linear-gradient(45deg, #667eea, #764ba2)"
                color="white"
                _hover={{
                  bg: "linear-gradient(45deg, #5a67d8, #6b46c1)",
                  transform: "translateY(-1px)",
                  boxShadow: "lg",
                }}
                borderRadius="full"
                px={6}
              >
                Profile
              </Button>
            </VStack>
          )}
        </HStack>
      </Container>
    </Box>
  )
}
