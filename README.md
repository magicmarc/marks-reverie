# Mark's Reverie

A contemplative personal blog website built with Next.js, featuring a literary design aesthetic and thoughtful content presentation.

## 🌟 Features

- **Literary Design**: Elegant typography with serif fonts and a calming color palette
- **Responsive Layout**: Mobile-first design that works beautifully on all devices
- **Blog System**: Clean, readable blog posts with tags and metadata
- **Modern Tech Stack**: Next.js 14, TypeScript, and styled-components
- **Performance Optimized**: Static generation and optimized loading

## 🎨 Design Philosophy

The website embraces a contemplative, literary aesthetic with:
- **Color Palette**: Minimalist black/white with soft creams and pale blues
- **Typography**: Crimson Text serif for headings, Inter sans-serif for body text
- **Spacing**: Generous whitespace for comfortable reading
- **Interactions**: Subtle hover effects and smooth transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- pnpm package manager

### Installation
```bash
# Clone or download the project
cd marks-reverie

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your site.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── lib/                # Utility functions and data
└── styles/             # Styling system and theme
```

## 📝 Content Management

Blog posts are managed using Markdown files in `src/content/posts/`. To add a new post:

1. Create a new `.md` file in `src/content/posts/`
2. Add front matter with metadata:
   ```markdown
   ---
   title: "Your Post Title"
   excerpt: "Brief description of your post"
   publishedAt: "2024-01-15"
   readTime: 5
   tags: ["tag1", "tag2"]
   slug: "your-post-slug"
   ---
   ```
3. Write your content using Markdown syntax
4. The post will automatically appear on the blog listing page

### Data Sources
The blog supports multiple data sources:
- **Markdown files** (default) - Professional writing experience
- **JSON files** - Simple data structure
- **API endpoints** - Dynamic content
- **Headless CMS** - Contentful, Strapi, etc.

## 🎨 Customization

### Colors
Edit `src/styles/theme.ts` to modify the color palette:
- Primary colors for main content
- Accent colors for highlights and links
- Background variations for different sections

### Typography
The theme includes:
- Font families (serif, sans-serif, monospace)
- Font sizes and weights
- Line heights for optimal readability

### Layout
Modify components in `src/components/Layout/` to adjust:
- Header navigation
- Footer content
- Overall page structure

## 📚 Documentation

For detailed technical documentation, see [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md).

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔮 Future Enhancements

- [ ] CMS integration for easier content management
- [ ] Search functionality
- [ ] Comments system
- [ ] RSS feed generation
- [ ] Dark mode toggle
- [ ] Contact form
- [ ] About page

## 📄 License

This project is created for personal use. Feel free to use and modify for your own blog.

---

*"The world is full of magic things, patiently waiting for our senses to grow sharper."* — W.B. Yeats
