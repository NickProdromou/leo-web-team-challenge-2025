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
  const { user, setUser, isUserSet, isProfileOpen, closeProfile } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (userData: User) => {
    setIsLoading(true)
    // Simulate a brief loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    setUser(userData)
    setIsEditing(false)
    setIsLoading(false)
    closeProfile() // Close modal after editing
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleClose = () => {
    if (isUserSet) {
      closeProfile()
      setIsEditing(false)
    }
  }

  const showForm = !isUserSet || isEditing
  const isOpen = !isUserSet || isEditing || isProfileOpen

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={isUserSet} // Only allow closing if user is set
      closeOnEsc={isUserSet}
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
              onCancel={isUserSet ? handleCancelEdit : undefined}
            />
          ) : (
            user && <UserProfile user={user} onEdit={handleEdit} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
