'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: space-between;
    position: relative;
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
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

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  flex-direction: column;
  gap: 4px;
  transition: all 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }

  &:hover {
    opacity: 0.7;
  }
`

const HamburgerLine = styled.span<{ $isOpen: boolean }>`
  width: 24px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.3s ease;
  transform-origin: center;

  &:nth-child(1) {
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
  }

  &:nth-child(2) {
    opacity: ${({ $isOpen }) => $isOpen ? '0' : '1'};
  }

  &:nth-child(3) {
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'};
  }
`

const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-right: 1px solid ${({ theme }) => theme.colors.border.light};
  z-index: 1001;
  transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
  padding: ${({ theme }) => theme.spacing['2xl']};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const MobileMenuClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  transition: color 0.3s ease;
  align-self: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

const MobileNavLink = styled(Link)<{ $isActive?: boolean }>`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.accent.gold : theme.colors.text.primary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent.gold};
  }
`

const Header = () => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
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
              Blogs
            </NavLink>
            <NavLink href="/novel" $isActive={pathname === '/novel' || pathname.startsWith('/novel/')}>
              Novels
            </NavLink>
            <NavLink href="/contact" $isActive={pathname === '/contact'}>
              Contact
            </NavLink>
          </Navigation>
          <MobileMenuButton onClick={toggleMobileMenu}>
            <HamburgerLine $isOpen={isMobileMenuOpen} />
            <HamburgerLine $isOpen={isMobileMenuOpen} />
            <HamburgerLine $isOpen={isMobileMenuOpen} />
          </MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>

      <MobileMenuOverlay $isOpen={isMobileMenuOpen} onClick={closeMobileMenu} />
      <MobileMenu $isOpen={isMobileMenuOpen}>
        <MobileMenuClose onClick={closeMobileMenu}>
          ×
        </MobileMenuClose>
        <MobileNavLink href="/" $isActive={pathname === '/'} onClick={closeMobileMenu}>
          Home
        </MobileNavLink>
        <MobileNavLink href="/blog" $isActive={pathname === '/blog'} onClick={closeMobileMenu}>
          Blogs
        </MobileNavLink>
        <MobileNavLink href="/novel" $isActive={pathname === '/novel' || pathname.startsWith('/novel/')} onClick={closeMobileMenu}>
          Novels
        </MobileNavLink>
        <MobileNavLink href="/contact" $isActive={pathname === '/contact'} onClick={closeMobileMenu}>
          Contact
        </MobileNavLink>
      </MobileMenu>
    </>
  )
}

export default Header
