'use client'

import styled from 'styled-components'

interface LogoIconProps {
  size?: number
  className?: string
}

const LogoImage = styled.img<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  transition: all 0.3s ease;
  object-fit: contain;
  
  &:hover {
    transform: scale(1.05);
  }
`

const LogoIcon: React.FC<LogoIconProps> = ({ size = 32, className }) => {
  return (
    <LogoImage 
      $size={size}
      src="/logos/logo-light.png"
      alt="Mark's Reverie Logo"
      className={className}
    />
  )
}

export default LogoIcon
