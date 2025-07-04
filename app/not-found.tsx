import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function NotFound() {
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
          <Text fontSize="4xl">🔍</Text>
          
          <VStack spacing={2}>
            <Heading size="lg" color="gray.700">
              Page Not Found
            </Heading>
            <Text fontSize="sm" color="gray.500">
              The page you're looking for doesn't exist
            </Text>
          </VStack>

          <Button
            as={Link}
            href="/"
            variant="gradientPink"
            size="lg"
            w="full"
          >
            Back to Home
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}
