'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo'

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9);
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogoLink = styled(Link)`
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }
`

const Navigation = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
`

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.accent.gold : theme.colors.text.secondary};
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
  letter-spacing: 0.3px;

  &:hover {
    color: ${({ theme }) => theme.colors.accent.gold};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.accent.gold};
    transform: ${({ $isActive }) => $isActive ? 'scaleX(1)' : 'scaleX(0)'};
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`

const Header = () => {
  const pathname = usePathname()

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoLink href="/">
          <Logo size="md" showText={true} />
        </LogoLink>
        <Navigation>
          <NavLink href="/" $isActive={pathname === '/'}>
            Home
          </NavLink>
          <NavLink href="/blog" $isActive={pathname === '/blog'}>
            Blog
          </NavLink>
          <NavLink href="/novel" $isActive={pathname === '/novel' || pathname.startsWith('/novel/')}>
            Novel
          </NavLink>
          <NavLink href="/contact" $isActive={pathname === '/contact'}>
            Contact
          </NavLink>
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
