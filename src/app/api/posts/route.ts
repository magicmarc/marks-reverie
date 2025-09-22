import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export async function GET() {
  try {
    // Get all markdown files in the posts directory
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

    // Sort by publication date (newest first)
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    return NextResponse.json(sortedPosts)
  } catch (error) {
    console.error('Error reading posts:', error)
    return NextResponse.json([], { status: 500 })
  }
}
