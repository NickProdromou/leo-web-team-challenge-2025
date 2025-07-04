import type { Metadata } from 'next'
import { Box } from '@chakra-ui/react'
import { Providers } from './providers'
import { UserInfoModal } from '@/components/UserInfoModal'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { gradients } from '@/theme/constants'

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
      <body style={{ margin: 0 }}>
        <Providers>
          <Box
            minH="100vh"
            display="flex"
            flexDirection="column"
            bg={gradients.background}
          >
            <Header />
            
            <Box as="main" flex={1}>
              {children}
            </Box>
            
            <Footer />
            
            <UserInfoModal />
          </Box>
        </Providers>
      </body>
    </html>
  )
}
