'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function usePagination() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get current page from URL, default to 1
  const currentPage = parseInt(searchParams.get('page') ?? '1', 10)
  
  // Ensure page is valid (at least 1)
  const validCurrentPage = Math.max(1, currentPage)
  
  const goToPage = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (page <= 1) {
      // Remove page parameter if going to page 1 (clean URL)
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    
    const newUrl = params.toString() ? `/?${params.toString()}` : '/'
    router.push(newUrl)
  }, [router, searchParams])
  
  const goToNextPage = useCallback(() => {
    goToPage(validCurrentPage + 1)
  }, [goToPage, validCurrentPage])
  
  const goToPreviousPage = useCallback(() => {
    goToPage(validCurrentPage - 1)
  }, [goToPage, validCurrentPage])
  
  return {
    currentPage: validCurrentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  }
}
