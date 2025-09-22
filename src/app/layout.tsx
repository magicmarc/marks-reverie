import type { Metadata } from 'next'
import ThemeProvider from '@/components/ThemeProvider'
import FontLoader from '@/components/FontLoader'
import { LoadingProvider } from '@/components/LoadingProvider'

export const metadata: Metadata = {
  title: "Mark's Reverie",
  description: 'A personal blog for thoughts, reflections, and literary musings',
  keywords: ['blog', 'literature', 'reflections', 'writing', 'thoughts'],
  authors: [{ name: 'Mark' }],
  openGraph: {
    title: "Mark's Reverie",
    description: 'A personal blog for thoughts, reflections, and literary musings',
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
