'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'

const BlogContainer = styled.div`
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
`

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  letter-spacing: -0.02em;
`

const PageSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  font-style: italic;
`

const PostsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing['2xl']};
  max-width: 800px;
  margin: 0 auto;
`

const PostCard = styled.article`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.accent.gold};
  }
`

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`

const PostDate = styled.time`
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
`

const ReadTime = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`

const PostTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const PostTags = styled.div`
  display: flex;
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

const ReadMoreLink = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.accent.gold};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-decoration: none;
  margin-top: ${({ theme }) => theme.spacing.md};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &::after {
    content: ' →';
    margin-left: ${({ theme }) => theme.spacing.xs};
    transition: margin-left 0.2s ease;
  }

  &:hover::after {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']};
  color: ${({ theme }) => theme.colors.text.muted};
  font-style: italic;
`


interface BlogListingProps {
  posts: BlogPost[]
}

export default function BlogListing({ posts }: BlogListingProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <BlogContainer>
      <PageHeader>
        <PageTitle>Blogs</PageTitle>
        <PageSubtitle>
          Thoughts, reflections, and literary musings
        </PageSubtitle>
      </PageHeader>

      {posts.length > 0 ? (
        <PostsGrid>
          {posts.map((post) => (
            <PostCard key={post.id}>
              <PostMeta>
                <PostDate dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </PostDate>
                <ReadTime>{post.readTime} min read</ReadTime>
              </PostMeta>
              
              <PostTitle>{post.title}</PostTitle>
              
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              
              <PostTags>
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </PostTags>
              
              <ReadMoreLink href={`/blog/${post.slug}`}>
                Read more
              </ReadMoreLink>
            </PostCard>
          ))}
        </PostsGrid>
      ) : (
        <EmptyState>
          No posts yet. Check back soon for new reflections and thoughts.
        </EmptyState>
      )}
    </BlogContainer>
  )
}
