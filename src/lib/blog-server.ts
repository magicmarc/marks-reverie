// 服务器端 Markdown 处理（用于静态生成）
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

// 服务器端函数 - 用于静态生成
export function getAllPosts(): BlogPost[] {
  if (typeof window !== 'undefined') {
    throw new Error('getAllPosts can only be called on the server side')
  }

  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const markdownFiles = fileNames.filter(name => name.endsWith('.md'))

    const posts = markdownFiles.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        id: slug,
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
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  if (typeof window !== 'undefined') {
    throw new Error('getPostBySlug can only be called on the server side')
  }

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return undefined
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      id: slug,
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      publishedAt: data.publishedAt,
      readTime: data.readTime,
      tags: data.tags || [],
    }
  } catch (error) {
    console.error('Error reading post:', error)
    return undefined
  }
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post => post.tags.includes(tag))
}
