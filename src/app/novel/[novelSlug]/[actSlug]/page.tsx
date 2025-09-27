import { notFound } from 'next/navigation'
import Layout from '@/components/Layout/Layout'
import NovelActContent from '@/components/NovelActContent'
import { getNovelActBySlug, getNovelBySlug } from '@/lib/novel-server'

interface NovelActPageProps {
  params: {
    novelSlug: string
    actSlug: string
  }
}

export default function NovelActPage({ params }: NovelActPageProps) {
  const act = getNovelActBySlug(params.novelSlug, params.actSlug)
  const novel = getNovelBySlug(params.novelSlug)

  if (!act || !novel) {
    notFound()
  }

  // Convert act to BlogPost format for NovelActContent component
  const post = {
    id: act.slug,
    title: act.title,
    excerpt: act.excerpt,
    content: act.content,
    publishedAt: act.publishedAt,
    readTime: act.readTime,
    tags: act.tags,
    slug: act.slug
  }

  // Get all acts for navigation
  const currentIndex = novel.acts.findIndex(novelAct => novelAct.slug === params.actSlug)
  const previousAct = currentIndex > 0 ? {
    id: novel.acts[currentIndex - 1].slug,
    title: novel.acts[currentIndex - 1].title,
    excerpt: novel.acts[currentIndex - 1].excerpt,
    content: novel.acts[currentIndex - 1].content,
    publishedAt: novel.acts[currentIndex - 1].publishedAt,
    readTime: novel.acts[currentIndex - 1].readTime,
    tags: novel.acts[currentIndex - 1].tags,
    slug: novel.acts[currentIndex - 1].slug
  } : null
  const nextAct = currentIndex < novel.acts.length - 1 ? {
    id: novel.acts[currentIndex + 1].slug,
    title: novel.acts[currentIndex + 1].title,
    excerpt: novel.acts[currentIndex + 1].excerpt,
    content: novel.acts[currentIndex + 1].content,
    publishedAt: novel.acts[currentIndex + 1].publishedAt,
    readTime: novel.acts[currentIndex + 1].readTime,
    tags: novel.acts[currentIndex + 1].tags,
    slug: novel.acts[currentIndex + 1].slug
  } : null

  return (
    <Layout>
      <NovelActContent 
        post={post} 
        previousAct={previousAct}
        nextAct={nextAct}
        currentIndex={currentIndex}
        totalActs={novel.acts.length}
        novelSlug={params.novelSlug}
      />
    </Layout>
  )
}

export function generateStaticParams() {
  const { getAllNovels } = require('@/lib/novel-server')
  const novels = getAllNovels()
  
  const params: { novelSlug: string; actSlug: string }[] = []
  
  novels.forEach((novel: any) => {
    novel.acts.forEach((act: any) => {
      params.push({
        novelSlug: novel.metadata.slug,
        actSlug: act.slug
      })
    })
  })
  
  return params
}
