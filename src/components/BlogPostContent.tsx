'use client'

import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlogPost } from '@/lib/blog'
import ShareButtons from './ShareButtons'
import { blogConfig } from '@/config/blog'

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
`

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent.gold};
  }

  &::before {
    content: '← ';
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`

const PostHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
`

const PostTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: -0.02em;
`

const PostMeta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

const PostDate = styled.time`
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
`

const ReadTime = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`

const Separator = styled.span`
  color: ${({ theme }) => theme.colors.border.medium};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

const PostTags = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.background.subtle};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`


const PostContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};

  /* Markdown 标题样式 */
  h1 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.light};
    margin-top: ${({ theme }) => theme.spacing['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    letter-spacing: -0.01em;
  }

  h2 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    margin-top: ${({ theme }) => theme.spacing['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
  }

  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    margin-top: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    margin-top: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  /* 段落样式 */
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }

  /* 引用块样式 */
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.accent.sage};
    padding: ${({ theme }) => theme.spacing.lg};
    margin: ${({ theme }) => theme.spacing.xl} 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.text.secondary};
    background-color: ${({ theme }) => theme.colors.background.subtle};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  /* 列表样式 */
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding-left: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  /* 代码样式 */
  code {
    background-color: ${({ theme }) => theme.colors.background.subtle};
    padding: 0.2em 0.4em;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 0.9em;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  pre {
    background-color: ${({ theme }) => theme.colors.background.subtle};
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin: ${({ theme }) => theme.spacing.lg} 0;
    
    code {
      background: none;
      padding: 0;
      font-size: 0.9em;
    }
  }

  /* 链接样式 */
  a {
    color: ${({ theme }) => theme.colors.accent.gold};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;

    &:hover {
      border-bottom-color: ${({ theme }) => theme.colors.accent.gold};
    }
  }

  /* 强调样式 */
  strong, b {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  em, i {
    font-style: italic;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

interface BlogPostContentProps {
  post: BlogPost
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get the current page URL for sharing
  const shareUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `${blogConfig.siteUrl}/blog/${post.slug}`

  return (
    <PostContainer>
      <BackLink href="/blog">Back to Blog</BackLink>
      
      <PostHeader>
        <PostTitle>{post.title}</PostTitle>
        
        <PostMeta>
          <PostDate dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </PostDate>
          <Separator>•</Separator>
          <ReadTime>{post.readTime} min read</ReadTime>
        </PostMeta>
        
        <PostTags>
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </PostTags>
      </PostHeader>

      <PostContent>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // 自定义渲染器，跳过文章标题（已经在头部显示）
            h1: ({ children }) => null,
            // 其他标题正常渲染
            h2: ({ children }) => <h2>{children}</h2>,
            h3: ({ children }) => <h3>{children}</h3>,
            h4: ({ children }) => <h4>{children}</h4>,
            h5: ({ children }) => <h5>{children}</h5>,
            h6: ({ children }) => <h6>{children}</h6>,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </PostContent>

      <ShareButtons 
        url={shareUrl}
        title={post.title}
        description={post.excerpt}
      />
    </PostContainer>
  )
}
