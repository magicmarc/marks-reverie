import { notFound } from 'next/navigation'
import Layout from '@/components/Layout/Layout'
import NovelActContent from '@/components/NovelActContent'
import { getPostBySlug, getAllPosts } from '@/lib/blog-server'

interface NovelActPageProps {
  params: {
    slug: string
  }
}

export default function NovelActPage({ params }: NovelActPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post || !post.tags.includes('novel')) {
    notFound()
  }

  // Get all novel acts for navigation
  const allPosts = getAllPosts()
  const novelActs = allPosts
    .filter(p => p.tags.includes('novel') && p.tags.includes("Will's Bookcase"))
    .sort((a, b) => {
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

  const currentIndex = novelActs.findIndex(act => act.slug === params.slug)
  const previousAct = currentIndex > 0 ? novelActs[currentIndex - 1] : null
  const nextAct = currentIndex < novelActs.length - 1 ? novelActs[currentIndex + 1] : null

  return (
    <Layout>
      <NovelActContent 
        post={post} 
        previousAct={previousAct}
        nextAct={nextAct}
        currentIndex={currentIndex}
        totalActs={novelActs.length}
      />
    </Layout>
  )
}

export function generateStaticParams() {
  const posts = getAllPosts()
  const novelPosts = posts.filter(post => post.tags.includes('novel'))
  
  return novelPosts.map((post) => ({
    slug: post.slug,
  }))
}
