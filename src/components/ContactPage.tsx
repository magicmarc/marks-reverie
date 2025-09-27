'use client'

import styled from 'styled-components'
import Layout from '@/components/Layout/Layout'

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

const ContactCard = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.accent.gold};
  }
`

const Name = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.typography.fontFamily.serif};
`

const Location = styled.div`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
`

const LocationIcon = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xl};
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  align-items: center;
`

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`

const ContactLabel = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.muted};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const ContactValue = styled.a`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.accent.gold};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: color 0.3s ease;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background.subtle};
  border: 1px solid ${props => props.theme.colors.border.light};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.typography.fontSize.base};
  }

  &:hover {
    color: ${props => props.theme.colors.text.primary};
    background: ${props => props.theme.colors.accent.gold};
    color: white;
    transform: translateY(-1px);
  }
`

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.text.secondary};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin-top: ${props => props.theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

export default function ContactPage() {
  return (
    <Layout>
      <Container>
        <Header>
          <Title>Contact</Title>
          <Subtitle>Let's connect and share ideas</Subtitle>
        </Header>

        <ContactCard>
          <Name>Mark Wang</Name>
          <Location>
            <LocationIcon>📍</LocationIcon>
            Sydney, Australia
          </Location>
          
          <ContactInfo>
            <ContactItem>
              <ContactLabel>Business & Literary Collaboration</ContactLabel>
              <ContactValue href="mailto:markmagicwang@gmail.com">
                markmagicwang@gmail.com
              </ContactValue>
            </ContactItem>
          </ContactInfo>

          <Description>
            Whether you're interested in business collaboration, literary discussions, 
            or simply want to share thoughts on writing and creativity, I'd love to hear from you. 
            Feel free to reach out for any inquiries or just to say hello.
          </Description>
        </ContactCard>
      </Container>
    </Layout>
  )
}
