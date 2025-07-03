'use client'

import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useUser } from '@/contexts/UserContext'
import { UserInfoForm } from './UserInfoForm'
import { UserProfile } from './UserProfile'
import { User } from '@/types/user'

export function UserInfoModal() {
  const { user, setUser, isUserSet } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (userData: User) => {
    setIsLoading(true)
    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    setUser(userData)
    setIsEditing(false)
    setIsLoading(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const showForm = !isUserSet || isEditing

  return (
    <Modal
      isOpen={!isUserSet || isEditing}
      onClose={() => {}} // Cannot be closed manually
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
      size={{ base: 'sm', md: 'md' }}
    >
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent mx={4}>
        <ModalHeader>
          <VStack spacing={2} align="start">
            <Text fontSize="xl" fontWeight="bold">
              {!isUserSet ? 'Welcome!' : 'User Information'}
            </Text>
            {!isUserSet && (
              <Text fontSize="sm" color="gray.600" fontWeight="normal">
                Please provide your information to continue
              </Text>
            )}
          </VStack>
        </ModalHeader>
        
        <ModalBody pb={6}>
          {showForm ? (
            <UserInfoForm
              onSubmit={handleSubmit}
              initialData={user || undefined}
              isLoading={isLoading}
            />
          ) : (
            user && <UserProfile user={user} onEdit={handleEdit} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
