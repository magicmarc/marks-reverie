#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

async function createPost() {
  console.log('📝 Creating a new blog post...\n')

  try {
    const title = await question('Post title: ')
    const excerpt = await question('Post excerpt: ')
    const slug = await question('Post slug (URL-friendly): ')
    const tags = await question('Tags (comma-separated): ')
    const readTime = await question('Estimated read time (minutes): ')

    const now = new Date()
    const publishedAt = now.toISOString().split('T')[0] // YYYY-MM-DD format

    const frontMatter = `---
title: "${title}"
excerpt: "${excerpt}"
publishedAt: "${publishedAt}"
readTime: ${readTime}
tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
slug: "${slug}"
---

# ${title}

${excerpt}

<!-- Write your content here -->`

    const postsDir = path.join(process.cwd(), 'src/content/posts')
    const fileName = `${slug}.md`
    const filePath = path.join(postsDir, fileName)

    // Ensure posts directory exists
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true })
    }

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`❌ File ${fileName} already exists!`)
      process.exit(1)
    }

    // Write the file
    fs.writeFileSync(filePath, frontMatter)
    
    console.log(`\n✅ Post created successfully!`)
    console.log(`📁 Location: ${filePath}`)
    console.log(`🌐 URL: /blog/${slug}`)
    
  } catch (error) {
    console.error('❌ Error creating post:', error.message)
  } finally {
    rl.close()
  }
}

createPost()
