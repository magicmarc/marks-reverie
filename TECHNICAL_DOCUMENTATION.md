# Mark's Reverie - Technical Documentation

## Project Overview

Mark's Reverie is a personal blog website built with Next.js 14, TypeScript, and styled-components. The site features a literary, contemplative design with a focus on readability and aesthetic appeal.

## Technology Stack

- **Framework**: Next.js 14.0.4 (App Router)
- **Language**: TypeScript 5.9.2
- **Styling**: styled-components 6.1.19
- **Package Manager**: pnpm 8.12.1
- **Fonts**: Inter (sans-serif), Crimson Text (serif)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   └── blog/              # Blog pages
│       ├── page.tsx       # Blog listing
│       └── [slug]/        # Dynamic blog post pages
│           └── page.tsx
├── components/            # React components
│   └── Layout/           # Layout components
│       ├── Header.tsx    # Navigation header
│       ├── Footer.tsx    # Site footer
│       └── Layout.tsx    # Main layout wrapper
├── lib/                  # Utility functions
│   └── blog.ts          # Blog data and helper functions
└── styles/              # Styling configuration
    ├── theme.ts         # Design system and color palette
    ├── GlobalStyles.tsx # Global CSS styles
    └── styled.d.ts      # TypeScript declarations for styled-components
```

## Design System

### Color Palette
The site uses a literary-inspired color scheme:

- **Primary Colors**:
  - Black: `#1a1a1a` (main text)
  - White: `#fafafa` (background)
  - Cream: `#f5f3f0` (subtle backgrounds)
  - Beige: `#e8e4dc` (borders)
  - Soft Blue: `#a8c8d8` (accent)
  - Light Blue: `#d4e4f0` (subtle accents)
  - Pale Blue: `#f0f5f8` (background variations)

- **Accent Colors**:
  - Gold: `#d4af37` (highlights, links)
  - Silver: `#c0c0c0` (secondary elements)
  - Sage: `#9caf88` (quotes, borders)

### Typography
- **Serif Font**: Crimson Text (headings, quotes)
- **Sans Font**: Inter (body text, UI elements)
- **Monospace**: JetBrains Mono (code)

### Spacing System
Consistent spacing using a scale: `xs` (0.25rem) to `4xl` (6rem)

## Key Features

### 1. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Flexible grid layouts

### 2. Blog System
- Static blog posts with sample content
- Dynamic routing for individual posts
- Tags and metadata support
- Reading time estimation

### 3. Navigation
- Sticky header with smooth scrolling
- Active page highlighting
- Responsive navigation

### 4. Styling Features
- CSS-in-JS with styled-components
- Theme provider for consistent styling
- Hover effects and transitions
- Custom scrollbar styling

## Development Setup

### Prerequisites
- Node.js 18+ 
- pnpm package manager

### Installation
```bash
pnpm install
```

### Development Server
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### Linting
```bash
pnpm lint
```

### Type Checking
```bash
pnpm type-check
```

## Configuration Files

### `next.config.js`
- Enables styled-components compiler
- App Router configuration

### `tsconfig.json`
- TypeScript configuration
- Path aliases for clean imports (`@/*`, `@/components/*`, etc.)

### `package.json`
- Project dependencies and scripts
- pnpm package manager specification

## Environment Variables

Copy `env.example` to `.env.local` and configure:

```env
NEXT_PUBLIC_SITE_NAME="Mark's Reverie"
NEXT_PUBLIC_SITE_DESCRIPTION="A personal blog for thoughts, reflections, and literary musings"
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## Content Management

Blog posts are now managed using Markdown files in `src/content/posts/`. Each post is a Markdown file with front matter metadata:

```markdown
---
title: "Post Title"
excerpt: "Post excerpt"
publishedAt: "2024-01-15"
readTime: 5
tags: ["tag1", "tag2"]
slug: "post-slug"
---

# Post Content

Your post content in Markdown format...
```

### Adding New Posts
1. Create a new `.md` file in `src/content/posts/`
2. Add front matter with required metadata
3. Write content using Markdown syntax
4. The slug should match the filename (without .md extension)

### Data Source Configuration
The blog supports multiple data sources configured via `BLOG_DATA_SOURCE` environment variable:
- `markdown` (default) - Markdown files in `src/content/posts/`
- `json` - JSON files in `src/data/`
- `api` - REST API endpoint
- `cms` - Headless CMS integration

## Deployment Considerations

### Static Generation
The blog uses Next.js static generation for optimal performance:
- `generateStaticParams()` for dynamic routes
- Pre-rendered pages at build time

### Performance Optimizations
- Image optimization with Next.js Image component
- Font optimization with Google Fonts
- CSS-in-JS compilation at build time

### SEO Features
- Meta tags configuration
- Open Graph support
- Semantic HTML structure
- Proper heading hierarchy

## Future Enhancements

### Potential Improvements
1. **CMS Integration**: Connect to a headless CMS (Strapi, Contentful, etc.)
2. **Search Functionality**: Add full-text search for blog posts
3. **Comments System**: Implement comment functionality
4. **RSS Feed**: Generate RSS feed for blog posts
5. **Dark Mode**: Add dark/light theme toggle
6. **Analytics**: Integrate Google Analytics or similar
7. **Contact Form**: Add contact page with form
8. **About Page**: Create detailed about page

### Technical Improvements
1. **Testing**: Add unit and integration tests
2. **Error Handling**: Implement error boundaries
3. **Loading States**: Add loading skeletons
4. **PWA**: Make it a Progressive Web App
5. **Performance**: Add performance monitoring

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2017+ features
- CSS Grid and Flexbox support required

## License

This project is for personal use. Modify as needed for your own blog.

---

*Last updated: January 2024*
