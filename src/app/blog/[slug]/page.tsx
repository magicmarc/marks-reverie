import { notFound } from 'next/navigation'
import Layout from '@/components/Layout/Layout'
import BlogPostContent from '@/components/BlogPostContent'
import { getPostBySlug, getAllPosts } from '@/lib/blog-server'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <BlogPostContent post={post} />
    </Layout>
  )
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
