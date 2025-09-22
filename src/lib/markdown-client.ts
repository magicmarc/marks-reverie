// 客户端安全的 Markdown 数据获取
import { BlogPost } from './blog'

export async function getMarkdownPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/api/posts')
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getMarkdownPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/posts/${slug}`)
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch post')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}
