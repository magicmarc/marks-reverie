import type { Metadata } from 'next'
import ThemeProvider from '@/components/ThemeProvider'
import FontLoader from '@/components/FontLoader'
import { LoadingProvider } from '@/components/LoadingProvider'

export const metadata: Metadata = {
  title: "Mark's Reverie - Writer's Community",
  description: 'A vibrant community of writers, readers, and literary enthusiasts. Join our Writing Challenge and share your stories.',
  keywords: ['writing community', 'writing challenge', 'literature', 'writers', 'stories', 'poems', 'book reviews', 'creative writing'],
  authors: [{ name: 'Mark' }],
  icons: {
    icon: '/logos/logo-light.png',
    shortcut: '/logos/logo-light.png',
    apple: '/logos/logo-light.png',
  },
  openGraph: {
    title: "Mark's Reverie - Writer's Community",
    description: 'A vibrant community of writers, readers, and literary enthusiasts. Join our Writing Challenge and share your stories.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <FontLoader />
        <ThemeProvider>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
