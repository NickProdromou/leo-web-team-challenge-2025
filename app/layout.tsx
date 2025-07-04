import type { Metadata } from 'next'
import { Providers } from './providers'
import { UserInfoModal } from '@/components/UserInfoModal'
import { Header } from '@/components/Header'
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
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Providers>
          <Header />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
          <UserInfoModal />
        </Providers>
      </body>
    </html>
  )
}
