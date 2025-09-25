import Layout from '@/components/Layout/Layout'
import { getAllPosts } from '@/lib/blog-server'
import NovelListing from '@/components/NovelListing'

export default function NovelPage() {
  const posts = getAllPosts()
  
  // Filter for Will's Bookcase Acts and sort them in order
  const willBookcaseActs = posts
    .filter(post => post.tags.includes('novel') && post.tags.includes("Will's Bookcase"))
    .sort((a, b) => {
      // Extract act numbers for proper sorting
      const getActNumber = (title: string) => {
        const match = title.match(/Act ([IVX]+)/i)
        if (!match) return 0
        const roman = match[1].toUpperCase()
        const romanToNumber: { [key: string]: number } = {
          'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6
        }
        return romanToNumber[roman] || 0
      }
      return getActNumber(a.title) - getActNumber(b.title)
    })

  return (
    <Layout>
      <NovelListing acts={willBookcaseActs} />
    </Layout>
  )
}
