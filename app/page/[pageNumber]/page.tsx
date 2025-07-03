import { redirect } from 'next/navigation'
import { HomePage } from '@/components/HomePage'

interface PageProps {
  params: {
    pageNumber: string
  }
}

// Generate static params for common pages (SEO optimization)
export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({
    pageNumber: (i + 2).toString(), // Start from 2 since 1 redirects to home
  }))
}

export default function AnimePage({ params }: PageProps) {
  const pageNumber = parseInt(params.pageNumber, 10)

  // Redirect to home if invalid page number
  if (isNaN(pageNumber) || pageNumber < 1) {
    redirect('/')
  }

  // Redirect page 1 to home
  if (pageNumber === 1) {
    redirect('/')
  }

  return <HomePage currentPage={pageNumber} />
}
