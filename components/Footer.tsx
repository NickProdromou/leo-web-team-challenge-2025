'use client'

import React from 'react'
import {
  Box,
  Container,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export function Footer() {
  const bg = useColorModeValue('purple.50', 'purple.900')
  const color = useColorModeValue('purple.600', 'purple.300')

  return (
    <Box
      as="footer"
      bg={bg}
      mt={16}
      py={4}
      borderTop="1px solid"
      borderColor="purple.200"
    >
      <Container maxW="container.xl">
        <Text
          fontSize="sm"
          color={color}
          textAlign="center"
        >
          Challenge Version v3.5
        </Text>
      </Container>
    </Box>
  )
}
