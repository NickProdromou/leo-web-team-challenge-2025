'use client'

import { useEffect } from 'react'
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('App error:', error)
  }, [error])

  return (
    <Box
      minH="50vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      <Box
        maxW="400px"
        bg="white"
        borderRadius="xl"
        boxShadow="md"
        p={8}
        textAlign="center"
      >
        <VStack spacing={6}>
          <Text fontSize="4xl">😵</Text>
          
          <VStack spacing={2}>
            <Heading size="lg" color="gray.700">
              Something went wrong!
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Don't worry, this happens sometimes
            </Text>
          </VStack>

          <VStack spacing={3} w="full">
            <Button
              onClick={reset}
              variant="gradientPink"
              size="lg"
              w="full"
            >
              Try Again
            </Button>
            
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              size="md"
              w="full"
              borderColor="purple.300"
              color="purple.600"
              _hover={{ bg: "purple.50" }}
            >
              Go Home
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Box>
  )
}
