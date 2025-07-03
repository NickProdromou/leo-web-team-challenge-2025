import { Box, Spinner, Text, VStack } from '@chakra-ui/react'

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <Box textAlign="center" p={8}>
      <VStack spacing={4}>
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        <Text fontSize="lg" color="gray.600">
          {message}
        </Text>
      </VStack>
    </Box>
  )
}
