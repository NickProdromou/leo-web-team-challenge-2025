'use client'

import {
  HStack,
  Button,
  Text,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const canGoPrevious = currentPage > 1
  const canGoNext = hasNextPage && currentPage < totalPages

  return (
    <HStack
      spacing={2}
      justify="center"
      p={4}
      bg={bgColor}
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      flexWrap="wrap"
    >
      {/* Previous button */}
      <IconButton
        aria-label="Previous page"
        icon={<ChevronLeftIcon />}
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={!canGoPrevious || isLoading}
        variant="outline"
        size="sm"
      />

      {/* First page */}
      {currentPage > 2 && (
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPageChange(1)}
            isDisabled={isLoading}
          >
            1
          </Button>
          {currentPage > 3 && (
            <Text fontSize="sm" color="gray.500">
              ...
            </Text>
          )}
        </>
      )}

      {/* Previous page */}
      {canGoPrevious && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={isLoading}
        >
          {currentPage - 1}
        </Button>
      )}

      {/* Current page */}
      <Button size="sm" colorScheme="blue" isDisabled>
        {currentPage}
      </Button>

      {/* Next page */}
      {canGoNext && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={isLoading}
        >
          {currentPage + 1}
        </Button>
      )}

      {/* Last page indicator */}
      {currentPage < totalPages - 1 && totalPages > 0 && (
        <>
          {currentPage < totalPages - 2 && (
            <Text fontSize="sm" color="gray.500">
              ...
            </Text>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPageChange(totalPages)}
            isDisabled={isLoading}
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next button */}
      <IconButton
        aria-label="Next page"
        icon={<ChevronRightIcon />}
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={!canGoNext || isLoading}
        variant="outline"
        size="sm"
      />

      {/* Page info */}
      <Text fontSize="sm" color="gray.600" ml={4}>
        Page {currentPage} {totalPages > 0 && `of ${totalPages}`}
      </Text>
    </HStack>
  )
}
