'use client'

import { useState } from 'react'
import styled from 'styled-components'

const ShareContainer = styled.div`
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`

const ShareTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontFamily.serif};
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`

const ShareButton = styled.button<{ $bgColor: string; $hoverColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ $bgColor }) => $bgColor};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    background-color: ${({ $hoverColor }) => $hoverColor};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`

const CopyButton = styled(ShareButton)<{ $copied: boolean }>`
  background-color: ${({ $copied, theme }) => 
    $copied ? theme.colors.accent.sage : '#6b7280'};
  
  &:hover {
    background-color: ${({ $copied, theme }) => 
      $copied ? theme.colors.accent.sage : '#4b5563'};
  }
`

const CopyFeedback = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent.sage};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: block;
`

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = description ? encodeURIComponent(description) : ''

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    const link = shareLinks[platform]
    window.open(link, '_blank', 'noopener,noreferrer,width=600,height=600')
  }

  return (
    <ShareContainer>
      <ShareTitle>Share this article</ShareTitle>
      <ButtonGroup>
        <ShareButton
          $bgColor="#1DA1F2"
          $hoverColor="#1a8cd8"
          onClick={() => handleShare('twitter')}
          aria-label="Share on Twitter"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>Twitter</span>
        </ShareButton>

        <ShareButton
          $bgColor="#1877F2"
          $hoverColor="#166fe5"
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Facebook</span>
        </ShareButton>

        <ShareButton
          $bgColor="#0A66C2"
          $hoverColor="#004182"
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span>LinkedIn</span>
        </ShareButton>

        <ShareButton
          $bgColor="#25D366"
          $hoverColor="#128C7E"
          onClick={() => handleShare('whatsapp')}
          aria-label="Share on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>WhatsApp</span>
        </ShareButton>

        <CopyButton
          $bgColor="#6b7280"
          $hoverColor="#4b5563"
          $copied={copied}
          onClick={handleCopyLink}
          aria-label="Copy link"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {copied ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            )}
          </svg>
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </CopyButton>
      </ButtonGroup>
    </ShareContainer>
  )
}

