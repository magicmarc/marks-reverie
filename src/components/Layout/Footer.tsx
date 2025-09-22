'use client'

import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background.subtle};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
  margin-top: auto;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

const FooterText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Copyright = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  font-style: italic;
`

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          A space for thoughts, reflections, and literary musings
        </FooterText>
        <Copyright>
          © {currentYear} Mark&apos;s Reverie. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
