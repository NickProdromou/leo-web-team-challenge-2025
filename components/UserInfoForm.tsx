'use client'

import { useState } from 'react'
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  HStack,
} from '@chakra-ui/react'
import { User } from '@/types/user'

interface UserInfoFormProps {
  onSubmit: (user: User) => void
  initialData?: User
  isLoading?: boolean
  onCancel?: () => void
}

export function UserInfoForm({ onSubmit, initialData, isLoading, onCancel }: UserInfoFormProps) {
  const [username, setUsername] = useState(initialData?.username || '')
  const [jobTitle, setJobTitle] = useState(initialData?.jobTitle || '')
  const [errors, setErrors] = useState<{ username?: string; jobTitle?: string }>({})

  const validate = () => {
    const newErrors: { username?: string; jobTitle?: string } = {}

    if (!username.trim()) {
      newErrors.username = 'Username is required'
    }

    if (!jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({ username: username.trim(), jobTitle: jobTitle.trim() })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              if (errors.username) {
                setErrors(prev => ({ ...prev, username: undefined }))
              }
            }}
            placeholder="Enter your username"
            disabled={isLoading}
          />
          <FormErrorMessage>{errors.username}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.jobTitle}>
          <FormLabel>Job Title</FormLabel>
          <Input
            value={jobTitle}
            onChange={(e) => {
              setJobTitle(e.target.value)
              if (errors.jobTitle) {
                setErrors(prev => ({ ...prev, jobTitle: undefined }))
              }
            }}
            placeholder="Enter your job title"
            disabled={isLoading}
          />
          <FormErrorMessage>{errors.jobTitle}</FormErrorMessage>
        </FormControl>

        {onCancel ? (
          <HStack spacing={3} width="full">
            <Button
              variant="outline"
              size="lg"
              width="full"
              onClick={onCancel}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              isLoading={isLoading}
            >
              {initialData ? 'Update Information' : 'Continue'}
            </Button>
          </HStack>
        ) : (
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            isLoading={isLoading}
          >
            {initialData ? 'Update Information' : 'Continue'}
          </Button>
        )}
      </VStack>
    </form>
  )
}
