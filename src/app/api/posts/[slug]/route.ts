import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const post = {
      id: slug,
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      publishedAt: data.publishedAt,
      readTime: data.readTime,
      tags: data.tags || [],
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error reading post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
