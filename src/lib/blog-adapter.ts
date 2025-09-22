import { BlogPost } from './blog'
import { getMarkdownPosts, getMarkdownPostBySlug } from './markdown-client'
import { blogConfig } from '@/config/blog'

// 数据适配器接口
interface BlogDataAdapter {
  getAllPosts(): BlogPost[] | Promise<BlogPost[]>
  getPostBySlug(slug: string): BlogPost | undefined | Promise<BlogPost | null>
  getPostsByTag(tag: string): BlogPost[] | Promise<BlogPost[]>
}

// JSON 数据适配器
class JsonBlogAdapter implements BlogDataAdapter {
  private posts: BlogPost[]

  constructor(posts: BlogPost[]) {
    this.posts = posts
  }

  getAllPosts(): BlogPost[] {
    return this.posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts.find(post => post.slug === slug)
  }

  getPostsByTag(tag: string): BlogPost[] {
    return this.posts.filter(post => post.tags.includes(tag))
  }
}

// Markdown 数据适配器
class MarkdownBlogAdapter implements BlogDataAdapter {
  async getAllPosts(): Promise<BlogPost[]> {
    const markdownPosts = await getMarkdownPosts()
    return markdownPosts.map(post => ({
      id: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      tags: post.tags,
      slug: post.slug,
    }))
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = await getMarkdownPostBySlug(slug)
    if (!post) return null
    
    return {
      id: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      tags: post.tags,
      slug: post.slug,
    }
  }

  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    const posts = await this.getAllPosts()
    return posts.filter(post => post.tags.includes(tag))
  }
}

// API 数据适配器（示例）
class ApiBlogAdapter implements BlogDataAdapter {
  private apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  async getAllPosts(): Promise<BlogPost[]> {
    // 实际实现中这里会调用 API
    const response = await fetch(`${this.apiUrl}/posts`)
    return response.json()
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    // 实际实现中这里会调用 API
    throw new Error('API adapter not fully implemented')
  }

  getPostsByTag(tag: string): BlogPost[] {
    // 实际实现中这里会调用 API
    throw new Error('API adapter not fully implemented')
  }
}

// 数据源工厂
export function createBlogAdapter(): BlogDataAdapter {
  switch (blogConfig.dataSource.type) {
    case 'markdown':
      return new MarkdownBlogAdapter()
    case 'api':
      if (!blogConfig.dataSource.apiUrl) {
        throw new Error('API URL is required for API data source')
      }
      return new ApiBlogAdapter(blogConfig.dataSource.apiUrl)
    case 'json':
    default:
      // 导入 JSON 数据（如果文件存在）
      try {
        const postsData = require('@/data/posts.json')
        return new JsonBlogAdapter(postsData)
      } catch (error) {
        console.warn('posts.json not found, falling back to markdown')
        return new MarkdownBlogAdapter()
      }
  }
}

// 导出单例实例
export const blogAdapter = createBlogAdapter()
