'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Novel } from '@/lib/novel'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 2px solid ${props => props.theme.colors.border.light};
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem;
  font-family: ${props => props.theme.typography.fontFamily.serif};
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 2rem;
  font-style: italic;
`

const Description = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.primary};
  text-align: left;
`

const NovelMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
`

const MetaItem = styled.span`
  background: ${props => props.theme.colors.background.subtle};
  padding: 0.5rem 1rem;
  border-radius: 12px;
`

const ActsContainer = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 3rem;
`

const ActCard = styled(Link)`
  background: ${props => props.theme.colors.background.paper};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  display: block;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.accent.gold};
  }
`

const ActHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const ActTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
  font-family: ${props => props.theme.typography.fontFamily.serif};
`

const ActNumber = styled.span`
  background: ${props => props.theme.colors.accent.gold};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`

const ActExcerpt = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`

const ActMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
`

const ReadTime = styled.span`
  background: ${props => props.theme.colors.background.subtle};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
`

const StartReadingButton = styled.div`
  text-align: center;
  margin-top: 3rem;
`

const StartButton = styled(Link)`
  background: ${props => props.theme.colors.accent.gold};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-block;
  
  &:hover {
    background: ${props => props.theme.colors.text.primary};
    transform: translateY(-2px);
  }
`

const CoverImage = styled.div`
  width: 300px;
  height: 420px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  margin: 0 auto 2rem;
  
  @media (max-width: 768px) {
    width: 250px;
    height: 350px;
  }
`

interface NovelDetailProps {
  novel: Novel
}

export default function NovelDetail({ novel }: NovelDetailProps) {
  const firstAct = novel.acts[0]

  return (
    <Container>
      <Header>
        {novel.metadata.coverImage && (
          <CoverImage>
            <Image
              src={novel.metadata.coverImage}
              alt={`${novel.metadata.title} cover`}
              width={300}
              height={420}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </CoverImage>
        )}
        
        <Title>{novel.metadata.title}</Title>
        <Subtitle>A Light Novel</Subtitle>
        <Description>
          <p>{novel.metadata.excerpt}</p>
        </Description>
        <NovelMeta>
          <MetaItem>{novel.acts.length} Acts</MetaItem>
          <MetaItem>{novel.metadata.readTime} min read</MetaItem>
          <MetaItem>By {novel.metadata.author}</MetaItem>
        </NovelMeta>
      </Header>

      <ActsContainer>
        {novel.acts.map((act, index) => (
          <ActCard key={act.slug} href={`/novel/${novel.metadata.slug}/${act.slug}`}>
            <ActHeader>
              <ActTitle>{act.title}</ActTitle>
              <ActNumber>{index + 1}</ActNumber>
            </ActHeader>
            
            <ActExcerpt>{act.excerpt}</ActExcerpt>
            
            <ActMeta>
              <ReadTime>{act.readTime} min read</ReadTime>
            </ActMeta>
          </ActCard>
        ))}
      </ActsContainer>

      {firstAct && (
        <StartReadingButton>
          <StartButton href={`/novel/${novel.metadata.slug}/${firstAct.slug}`}>
            Start Reading
          </StartButton>
        </StartReadingButton>
      )}
    </Container>
  )
}
