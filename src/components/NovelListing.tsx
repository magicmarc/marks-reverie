'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Novel } from '@/lib/novel'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
`

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  font-weight: ${props => props.theme.typography.fontWeight.light};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.typography.fontFamily.serif};
  letter-spacing: -0.02em;
`

const Subtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  font-style: italic;
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`

const Description = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.primary};
  text-align: left;
`

const NovelsContainer = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 3rem;
`

const NovelCard = styled(Link)`
  background: ${props => props.theme.colors.background.paper};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.accent.gold};
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const NovelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`

const NovelTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
  font-family: ${props => props.theme.typography.fontFamily.serif};
`

const NovelMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  
  @media (max-width: 768px) {
    align-self: flex-start;
  }
`

const ActCount = styled.span`
  background: ${props => props.theme.colors.accent.gold};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 600;
`

const ReadTime = styled.span`
  background: ${props => props.theme.colors.background.subtle};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
`

const NovelExcerpt = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`

const CoverImage = styled.div`
  flex-shrink: 0;
  width: 200px;
  height: 280px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`

const NovelContent = styled.div`
  flex: 1;
`

interface NovelListingProps {
  novels: Novel[]
}

export default function NovelListing({ novels }: NovelListingProps) {
  return (
    <Container>
      <Header>
        <Title>Novels</Title>
        <Subtitle>Light Novels & Fiction</Subtitle>
      </Header>

      <NovelsContainer>
        {novels.map((novel) => (
          <NovelCard key={novel.metadata.slug} href={`/novel/${novel.metadata.slug}`}>
            {novel.metadata.coverImage && (
              <CoverImage>
                <Image
                  src={novel.metadata.coverImage}
                  alt={`${novel.metadata.title} cover`}
                  width={200}
                  height={280}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </CoverImage>
            )}
            
            <NovelContent>
              <NovelHeader>
                <NovelTitle>{novel.metadata.title}</NovelTitle>
                <NovelMeta>
                  <ActCount>{novel.acts.length} Acts</ActCount>
                  <ReadTime>{novel.metadata.readTime} min read</ReadTime>
                </NovelMeta>
              </NovelHeader>
              
              <NovelExcerpt>{novel.metadata.excerpt}</NovelExcerpt>
            </NovelContent>
          </NovelCard>
        ))}
      </NovelsContainer>
    </Container>
  )
}