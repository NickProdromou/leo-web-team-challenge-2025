import type { Metadata } from 'next'
import { Providers } from './providers'
import { UserInfoModal } from '@/components/UserInfoModal'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Leonardo.AI Challenge',
  description: 'Anime discovery app built with Next.js and AniList API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Footer />
          <UserInfoModal />
        </Providers>
      </body>
    </html>
  )
}
