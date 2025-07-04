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
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(5px)" />
      <ModalContent
        mx={4}
        bg="white"
        borderRadius="2xl"
        boxShadow="2xl"
        border="1px solid"
        borderColor="purple.200"
      >
        <ModalHeader
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          color="white"
          borderTopRadius="2xl"
          fontWeight="bold"
        >
          <VStack spacing={2} align="start">
            <Text fontSize="xl" fontWeight="bold">
              {!isUserSet ? 'Welcome!' : 'Profile'}
            </Text>
            {!isUserSet && (
              <Text fontSize="sm" color="white" fontWeight="normal" opacity={0.9}>
                Please provide your information to continue
              </Text>
            )}
          </VStack>
        </ModalHeader>

        <ModalBody p={6}>
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
