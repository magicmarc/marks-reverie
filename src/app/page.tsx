'use client'

import styled from 'styled-components'
import Layout from '@/components/Layout/Layout'
import Link from 'next/link'

const HeroSection = styled.section`
  padding: ${({ theme }) => theme.spacing['4xl']} 0;
  text-align: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.main} 0%,
    ${({ theme }) => theme.colors.primary.paleBlue} 100%
  );
  border-radius: 0 0 40px 40px;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
`

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing['2xl']};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  font-style: italic;
`

const CTAButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing['2xl']};
  background-color: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.text.light};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  transition: all 0.3s ease;
  letter-spacing: 0.5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent.gold};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const ContentSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`

const ContentCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.accent.gold};
  }
`

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const QuoteSection = styled.section`
  background-color: ${({ theme }) => theme.colors.background.subtle};
  padding: ${({ theme }) => theme.spacing['3xl']};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`

const Quote = styled.blockquote`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: none;
  padding: 0;
  background: none;
`

const QuoteAuthor = styled.cite`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text.muted};
  font-style: normal;
`

export default function Home() {
  return (
    <Layout>
      <HeroSection>
        <HeroTitle>Welcome to Mark&apos;s Reverie</HeroTitle>
        <HeroSubtitle>
          A contemplative space where thoughts wander freely, 
          ideas take flight, and the written word finds its home.
        </HeroSubtitle>
        <CTAButton href="/blog">Explore My Thoughts</CTAButton>
      </HeroSection>

      <ContentSection>
        <ContentCard>
          <CardTitle>About This Space</CardTitle>
          <CardDescription>
            This is where I share my musings, reflections, and literary explorations. 
            Each post is a window into my thoughts on life, literature, creativity, 
            and the quiet moments that shape our understanding of the world.
          </CardDescription>
        </ContentCard>

        <ContentCard>
          <CardTitle>Recent Reflections</CardTitle>
          <CardDescription>
            From the profound to the playful, from book reviews to personal essays, 
            you&apos;ll find a collection of writings that capture the essence of 
            thoughtful living and mindful observation.
          </CardDescription>
        </ContentCard>
      </ContentSection>

      <QuoteSection>
        <Quote>
          &quot;The world is full of magic things, patiently waiting for our senses to grow sharper.&quot;
        </Quote>
        <QuoteAuthor>— W.B. Yeats</QuoteAuthor>
      </QuoteSection>
    </Layout>
  )
}
