'use client'

import Link from 'next/link'
import { BlogPost } from '@/lib/blog'
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


interface NovelListingProps {
  acts: BlogPost[]
}

export default function NovelListing({ acts }: NovelListingProps) {
  const firstAct = acts[0]

  return (
    <Container>
      <Header>
        <Title>Will's Bookcase</Title>
        <Subtitle>A Light Novel</Subtitle>
        <Description>
          <p>
          In a cramped Sydney flat, four friends drift between rent payments, late-night arguments, and the restless search for meaning. But Will’s bookcase is no ordinary piece of furniture. Behind its shelves lies something vast—worlds that breathe, stories that bleed into reality.
          </p>
          <p>
          Will’s bookcase doesn’t just open onto fiction. It opens onto them.
          </p>
        </Description>
      </Header>

      <ActsContainer>
        {acts.map((act, index) => (
          <ActCard key={act.id} href={`/novel/${act.slug}`}>
            <ActHeader>
              <ActTitle>{act.title}</ActTitle>
              <ActNumber>Act {index + 1}</ActNumber>
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
          <StartButton href={`/novel/${firstAct.slug}`}>
            Start Reading
          </StartButton>
        </StartReadingButton>
      )}
    </Container>
  )
}
