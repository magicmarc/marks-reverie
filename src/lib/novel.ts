import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface NovelMetadata {
  title: string
  excerpt: string
  publishedAt: string
  readTime: number
  tags: string[]
  slug: string
  author: string
  coverImage?: string
}

export interface NovelAct {
  title: string
  excerpt: string
  publishedAt: string
  readTime: number
  tags: string[]
  slug: string
  content: string
}

export interface Novel {
  metadata: NovelMetadata
  acts: NovelAct[]
}

const novelsDirectory = path.join(process.cwd(), 'src/content/novels')

export function getAllNovels(): Novel[] {
  const novelDirs = fs.readdirSync(novelsDirectory)
  
  return novelDirs.map(novelSlug => {
    const novelPath = path.join(novelsDirectory, novelSlug)
    const metadataPath = path.join(novelPath, 'metadata.md')
    
    // Read metadata
    const metadataFile = fs.readFileSync(metadataPath, 'utf8')
    const { data: metadata } = matter(metadataFile)
    
    // Read acts
    const actFiles = fs.readdirSync(novelPath)
      .filter(file => (file.startsWith('Act_') || file.startsWith('ACT_')) && file.endsWith('.md'))
      .sort((a, b) => {
        // Extract act numbers for proper sorting
        const getActNumber = (filename: string) => {
          const match = filename.match(/[Aa]ct_([IVX]+)/i)
          if (!match) return 0
          const roman = match[1].toUpperCase()
          const romanToNumber: { [key: string]: number } = {
            'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6
          }
          return romanToNumber[roman] || 0
        }
        return getActNumber(a) - getActNumber(b)
      })
    
    const acts: NovelAct[] = actFiles.map(actFile => {
      const actPath = path.join(novelPath, actFile)
      const actContent = fs.readFileSync(actPath, 'utf8')
      const { data: frontmatter, content } = matter(actContent)
      
      return {
        title: frontmatter.title,
        excerpt: frontmatter.excerpt,
        publishedAt: frontmatter.publishedAt,
        readTime: frontmatter.readTime,
        tags: frontmatter.tags,
        slug: frontmatter.slug,
        content
      }
    })
    
    return {
      metadata: metadata as NovelMetadata,
      acts
    }
  })
}

export function getNovelBySlug(slug: string): Novel | null {
  const novels = getAllNovels()
  return novels.find(novel => novel.metadata.slug === slug) || null
}

export function getNovelActBySlug(novelSlug: string, actSlug: string): NovelAct | null {
  const novel = getNovelBySlug(novelSlug)
  if (!novel) return null
  
  return novel.acts.find(act => act.slug === actSlug) || null
}
