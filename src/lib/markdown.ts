import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export interface MarkdownPost {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  readTime: number
  tags: string[]
}

// 服务器端函数 - 只能在构建时或 API 路由中使用
export function getMarkdownPosts(): MarkdownPost[] {
  if (typeof window !== 'undefined') {
    throw new Error('getMarkdownPosts can only be called on the server side')
  }

  // Get all markdown files in the posts directory
  const fileNames = fs.readdirSync(postsDirectory)
  const markdownFiles = fileNames.filter(name => name.endsWith('.md'))

  const posts = markdownFiles.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      publishedAt: data.publishedAt,
      readTime: data.readTime,
      tags: data.tags || [],
    }
  })

  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getMarkdownPostBySlug(slug: string): MarkdownPost | null {
  if (typeof window !== 'undefined') {
    throw new Error('getMarkdownPostBySlug can only be called on the server side')
  }

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      publishedAt: data.publishedAt,
      readTime: data.readTime,
      tags: data.tags || [],
    }
  } catch (error) {
    return null
  }
}
