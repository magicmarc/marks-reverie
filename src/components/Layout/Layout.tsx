'use client'

import styled from 'styled-components'
import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.main};
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Content>
          {children}
        </Content>
      </Main>
      <Footer />
    </LayoutContainer>
  )
}

export default Layout
