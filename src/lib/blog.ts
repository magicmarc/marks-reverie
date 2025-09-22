// 客户端安全的博客数据接口和类型定义
export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  readTime: number
  tags: string[]
  slug: string
}

// 客户端安全的 API 调用函数
export async function getAllPosts(): Promise<BlogPost[]> {
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

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
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

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.tags.includes(tag))
}
