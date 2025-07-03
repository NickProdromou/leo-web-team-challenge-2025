import type { Metadata } from 'next'

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
      <body>{children}</body>
    </html>
  )
}
