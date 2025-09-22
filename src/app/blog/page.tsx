import Layout from '@/components/Layout/Layout'
import { getAllPosts } from '@/lib/blog-server'
import BlogListing from '@/components/BlogListing'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <Layout>
      <BlogListing posts={posts} />
    </Layout>
  )
}
