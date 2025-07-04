'use client'

import React from 'react'
import { Box, Text, Button, VStack, Divider } from '@chakra-ui/react'
import { User } from '@/types/user'

interface UserProfileProps {
  user: User
  onEdit: () => void
}

export function UserProfile({ user, onEdit }: UserProfileProps) {
  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text fontSize="sm" color="gray.600" mb={1}>
          Username
        </Text>
        <Text fontSize="md">{user.username}</Text>
      </Box>

      <Box>
        <Text fontSize="sm" color="gray.600" mb={1}>
          Job Title
        </Text>
        <Text fontSize="md">{user.jobTitle}</Text>
      </Box>

      <Divider />

      <Button variant="outline" onClick={onEdit}>
        Edit Information
      </Button>
    </VStack>
  )
}
