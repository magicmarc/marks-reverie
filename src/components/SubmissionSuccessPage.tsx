'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styled from 'styled-components'
import Layout from '@/components/Layout/Layout'
import Link from 'next/link'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const SuccessCard = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border: 2px solid ${props => props.theme.colors.accent.sage};
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.lg};
`

const IconWrapper = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.spacing.xl};
  animation: bounceIn 0.6s ease-out;

  @keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
`

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.typography.fontFamily.serif};
`

const Message = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.text.secondary};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`

const SubmissionDetails = styled.div`
  background: ${props => props.theme.colors.background.subtle};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.xl};
  margin: ${props => props.theme.spacing['2xl']} 0;
  text-align: left;
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.sm} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border.light};

  &:last-child {
    border-bottom: none;
  }
`

const DetailLabel = styled.span`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.base};
`

const DetailValue = styled.span`
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.base};
  text-align: right;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacing.xl};
`

const Button = styled(Link)<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: ${props => props.theme.typography.fontFamily.sans};
  display: inline-block;

  ${props => props.$variant === 'primary' ? `
    color: white;
    background: ${props.theme.colors.accent.gold};
    
    &:hover {
      background: ${props.theme.colors.text.primary};
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.md};
    }
  ` : `
    color: ${props.theme.colors.text.primary};
    background: ${props.theme.colors.background.main};
    border: 1px solid ${props.theme.colors.border.medium};
    
    &:hover {
      border-color: ${props.theme.colors.accent.gold};
      background: ${props.theme.colors.background.subtle};
    }
  `}
`

interface SubmissionData {
  name: string
  email: string
  phone: string
  workTitle: string
  fileName: string
  submittedAt: string
}

export default function SubmissionSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null)

  useEffect(() => {
    // Get submission data from URL params
    const name = searchParams.get('name')
    const email = searchParams.get('email')
    const phone = searchParams.get('phone')
    const workTitle = searchParams.get('workTitle')
    const fileName = searchParams.get('fileName')
    const submittedAt = searchParams.get('submittedAt')

    if (name && email && phone && workTitle && fileName && submittedAt) {
      const data: SubmissionData = {
        name,
        email,
        phone,
        workTitle,
        fileName,
        submittedAt,
      }
      setSubmissionData(data)

      // Store in localStorage for submission history
      const existingSubmissions = localStorage.getItem('writingChallengeSubmissions')
      const submissions = existingSubmissions ? JSON.parse(existingSubmissions) : []
      submissions.push(data)
      localStorage.setItem('writingChallengeSubmissions', JSON.stringify(submissions))
    } else {
      // If no data, redirect back to form
      setTimeout(() => {
        router.push('/writing-challenge')
      }, 3000)
    }
  }, [searchParams, router])

  return (
    <Layout>
      <Container>
        <SuccessCard>
          <IconWrapper>✨</IconWrapper>
          <Title>Submission Successful!</Title>
          <Message>
            Thank you for your submission. Your work has been sent successfully 
            and I'll review it shortly. You'll receive a response via email.
          </Message>

          {submissionData && (
            <SubmissionDetails>
              <DetailRow>
                <DetailLabel>Work Title:</DetailLabel>
                <DetailValue>{submissionData.workTitle}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Your Name:</DetailLabel>
                <DetailValue>{submissionData.name}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Email:</DetailLabel>
                <DetailValue>{submissionData.email}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Phone:</DetailLabel>
                <DetailValue>{submissionData.phone}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>File:</DetailLabel>
                <DetailValue>{submissionData.fileName}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Submitted At:</DetailLabel>
                <DetailValue>
                  {new Date(submissionData.submittedAt).toLocaleString('en-AU', {
                    timeZone: 'Australia/Sydney',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </DetailValue>
              </DetailRow>
            </SubmissionDetails>
          )}

          <ButtonGroup>
            <Button href="/writing-challenge/history" $variant="primary">
              View My Submissions
            </Button>
            <Button href="/" $variant="secondary">
              Back to Home
            </Button>
          </ButtonGroup>
        </SuccessCard>
      </Container>
    </Layout>
  )
}

