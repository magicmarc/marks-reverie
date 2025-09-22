'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

// 加载状态上下文
interface LoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

// 加载遮罩层
const LoadingOverlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.background.main};
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.2s ease;
`

const LoadingContent = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.muted};
`

const LoadingText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border.light};
  border-top: 3px solid ${({ theme }) => theme.colors.accent.gold};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

interface LoadingProviderProps {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  // 监听路由变化，显示加载状态
  useEffect(() => {
    setIsLoading(true)
    
    // 短暂延迟后隐藏加载状态，确保页面内容已渲染
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 150)

    return () => clearTimeout(timer)
  }, [pathname])

  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      <LoadingOverlay $isVisible={isLoading}>
        <LoadingContent>
          <LoadingText>Loading...</LoadingText>
          <LoadingSpinner />
        </LoadingContent>
      </LoadingOverlay>
    </LoadingContext.Provider>
  )
}

// Hook to use loading context
export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
