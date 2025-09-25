'use client'

import Link from 'next/link'
import { BlogPost } from '@/lib/blog'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid ${props => props.theme.colors.border.light};
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem;
  font-family: ${props => props.theme.typography.fontFamily.serif};
  line-height: 1.2;
`

const ActNumber = styled.div`
  background: ${props => props.theme.colors.accent.gold};
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
`

const Meta = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 1rem;
`

const ReadTime = styled.span`
  background: ${props => props.theme.colors.background.subtle};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
`

const Progress = styled.div`
  background: ${props => props.theme.colors.background.subtle};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
`

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 3rem;
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.typography.fontFamily.serif};
    color: ${props => props.theme.colors.text.primary};
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.8rem;
    border-bottom: 1px solid ${props => props.theme.colors.border.light};
    padding-bottom: 0.5rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  strong {
    font-weight: 600;
  }
  
  em {
    font-style: italic;
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.accent.gold};
    padding-left: 1rem;
    margin: 2rem 0;
    font-style: italic;
    color: ${props => props.theme.colors.text.secondary};
  }
`

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid ${props => props.theme.colors.border.light};
`

const NavButton = styled(Link)<{ $disabled?: boolean }>`
  background: ${props => props.$disabled ? props.theme.colors.background.subtle : props.theme.colors.accent.gold};
  color: ${props => props.$disabled ? props.theme.colors.text.muted : 'white'};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  pointer-events: ${props => props.$disabled ? 'none' : 'auto'};
  
  &:hover {
    background: ${props => props.$disabled ? props.theme.colors.background.subtle : props.theme.colors.text.primary};
    transform: ${props => props.$disabled ? 'none' : 'translateY(-1px)'};
  }
`

const BackToNovel = styled(Link)`
  background: ${props => props.theme.colors.background.subtle};
  color: ${props => props.theme.colors.text.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.border.light};
  
  &:hover {
    background: ${props => props.theme.colors.accent.gold};
    color: white;
    transform: translateY(-1px);
  }
`

const CenterNav = styled.div`
  display: flex;
  gap: 1rem;
`

interface NovelActContentProps {
  post: BlogPost
  previousAct: BlogPost | null
  nextAct: BlogPost | null
  currentIndex: number
  totalActs: number
}

export default function NovelActContent({ 
  post, 
  previousAct, 
  nextAct, 
  currentIndex, 
  totalActs 
}: NovelActContentProps) {
  const getActNumber = (title: string) => {
    const match = title.match(/Act ([IVX]+)/i)
    return match ? match[1] : '?'
  }

  return (
    <Container>
      <Header>
        <ActNumber>Act {getActNumber(post.title)}</ActNumber>
        <Title>{post.title}</Title>
        <Meta>
          <ReadTime>{post.readTime} min read</ReadTime>
          <Progress>Act {currentIndex + 1} of {totalActs}</Progress>
        </Meta>
      </Header>

      <Content>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Content>

      <Navigation>
        <NavButton 
          href={previousAct ? `/novel/${previousAct.slug}` : '#'} 
          $disabled={!previousAct}
        >
          ← {previousAct ? `Act ${getActNumber(previousAct.title)}` : 'First Act'}
        </NavButton>
        
        <CenterNav>
          <BackToNovel href="/novel">
            📚 All Acts
          </BackToNovel>
        </CenterNav>
        
        <NavButton 
          href={nextAct ? `/novel/${nextAct.slug}` : '#'} 
          $disabled={!nextAct}
        >
          {nextAct ? `Act ${getActNumber(nextAct.title)}` : 'Last Act'} →
        </NavButton>
      </Navigation>
    </Container>
  )
}
