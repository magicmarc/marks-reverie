import { notFound } from 'next/navigation'
import Layout from '@/components/Layout/Layout'
import NovelDetail from '@/components/NovelDetail'
import { getNovelBySlug } from '@/lib/novel-server'

interface NovelPageProps {
  params: {
    novelSlug: string
  }
}

export default function NovelPage({ params }: NovelPageProps) {
  const novel = getNovelBySlug(params.novelSlug)

  if (!novel) {
    notFound()
  }

  return (
    <Layout>
      <NovelDetail novel={novel} />
    </Layout>
  )
}

export function generateStaticParams() {
  const { getAllNovels } = require('@/lib/novel-server')
  const novels = getAllNovels()
  
  return novels.map((novel: any) => ({
    novelSlug: novel.metadata.slug,
  }))
}
