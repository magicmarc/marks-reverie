import Layout from '@/components/Layout/Layout'
import { getAllNovels } from '@/lib/novel-server'
import NovelListing from '@/components/NovelListing'

export default function NovelPage() {
  const novels = getAllNovels()

  return (
    <Layout>
      <NovelListing novels={novels} />
    </Layout>
  )
}
