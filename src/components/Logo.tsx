'use client'

import styled from 'styled-components'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
}

const LogoContainer = styled.div<{ $size: string }>`
  display: flex;
  align-items: center;
  gap: ${({ theme, $size }) => {
    switch ($size) {
      case 'sm': return theme.spacing.sm
      case 'md': return theme.spacing.md
      case 'lg': return theme.spacing.lg
      case 'xl': return theme.spacing.xl
      default: return theme.spacing.md
    }
  }};
`

const LogoImage = styled.img<{ $size: string }>`
  flex-shrink: 0;
  ${({ $size }) => {
    switch ($size) {
      case 'sm': return 'width: 24px; height: 24px;'
      case 'md': return 'width: 32px; height: 32px;'
      case 'lg': return 'width: 48px; height: 48px;'
      case 'xl': return 'width: 64px; height: 64px;'
      default: return 'width: 32px; height: 32px;'
    }
  }}
  
  transition: all 0.3s ease;
  object-fit: contain;
  
  &:hover {
    transform: scale(1.05);
  }
`

const LogoText = styled.div<{ $size: string }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  
  ${({ $size }) => {
    switch ($size) {
      case 'sm': return 'font-size: 0.875rem;'
      case 'md': return 'font-size: 1.125rem;'
      case 'lg': return 'font-size: 1.5rem;'
      case 'xl': return 'font-size: 2rem;'
      default: return 'font-size: 1.125rem;'
    }
  }}
`

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className 
}) => {
  return (
    <LogoContainer $size={size} className={className}>
      <LogoImage 
        $size={size}
        src="/logos/logo-light.png"
        alt="Mark's Reverie Logo"
      />
      
      {showText && (
        <LogoText $size={size}>
          Mark&apos;s Reverie
        </LogoText>
      )}
    </LogoContainer>
  )
}

export default Logo

