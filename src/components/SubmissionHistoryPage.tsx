'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '@/components/Layout/Layout'
import Link from 'next/link'

const Container = styled.div`
  max-width: 900px;
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
  font-style: italic;
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`

const SubmissionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`

const SubmissionCard = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
    border-color: ${props => props.theme.colors.accent.gold};
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`

const WorkTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.typography.fontFamily.serif};
  flex: 1;
`

const SubmissionDate = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.muted};
  white-space: nowrap;
`

const CardDetails = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.md};
`

const DetailLabel = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DetailValue = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing['4xl']} ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background.paper};
  border: 2px dashed ${props => props.theme.colors.border.medium};
  border-radius: 12px;
`

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.spacing.xl};
  opacity: 0.5;
`

const EmptyTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.typography.fontFamily.serif};
`

const EmptyText = styled.p`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`

const Button = styled(Link)`
  display: inline-block;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: white;
  background: ${props => props.theme.colors.accent.gold};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: ${props => props.theme.typography.fontFamily.sans};

  &:hover {
    background: ${props => props.theme.colors.text.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background.subtle};
  border-radius: ${props => props.theme.borderRadius.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
  }
`

const SubmissionCount = styled.div`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.text.secondary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`

const ClearButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.secondary};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border.medium};
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${props => props.theme.typography.fontFamily.sans};

  &:hover {
    color: ${props => props.theme.colors.text.primary};
    border-color: ${props => props.theme.colors.text.primary};
  }
`

interface SubmissionData {
  name: string
  email: string
  phone: string
  workTitle: string
  fileName: string
  submittedAt: string
}

export default function SubmissionHistoryPage() {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([])

  useEffect(() => {
    // Load submissions from localStorage
    const savedSubmissions = localStorage.getItem('writingChallengeSubmissions')
    if (savedSubmissions) {
      try {
        const parsed = JSON.parse(savedSubmissions)
        // Sort by date, most recent first
        const sorted = parsed.sort((a: SubmissionData, b: SubmissionData) => 
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        )
        setSubmissions(sorted)
      } catch (error) {
        console.error('Failed to parse submissions:', error)
      }
    }
  }, [])

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your submission history? This cannot be undone.')) {
      localStorage.removeItem('writingChallengeSubmissions')
      setSubmissions([])
    }
  }

  return (
    <Layout>
      <Container>
        <Header>
          <Title>My Submissions</Title>
          <Subtitle>View all your Writing Challenge submissions</Subtitle>
        </Header>

        {submissions.length > 0 ? (
          <>
            <ActionBar>
              <SubmissionCount>
                {submissions.length} {submissions.length === 1 ? 'submission' : 'submissions'}
              </SubmissionCount>
              <ClearButton onClick={handleClearHistory}>
                Clear History
              </ClearButton>
            </ActionBar>

            <SubmissionsList>
              {submissions.map((submission, index) => (
                <SubmissionCard key={index}>
                  <CardHeader>
                    <WorkTitle>{submission.workTitle}</WorkTitle>
                    <SubmissionDate>
                      {new Date(submission.submittedAt).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </SubmissionDate>
                  </CardHeader>

                  <CardDetails>
                    <DetailLabel>Name:</DetailLabel>
                    <DetailValue>{submission.name}</DetailValue>
                    
                    <DetailLabel>Email:</DetailLabel>
                    <DetailValue>{submission.email}</DetailValue>
                    
                    <DetailLabel>Phone:</DetailLabel>
                    <DetailValue>{submission.phone}</DetailValue>
                    
                    <DetailLabel>File:</DetailLabel>
                    <DetailValue>{submission.fileName}</DetailValue>
                  </CardDetails>
                </SubmissionCard>
              ))}
            </SubmissionsList>
          </>
        ) : (
          <EmptyState>
            <EmptyIcon>📝</EmptyIcon>
            <EmptyTitle>No Submissions Yet</EmptyTitle>
            <EmptyText>
              You haven't made any submissions to the Writing Challenge yet. 
              Share your work and be part of the conversation!
            </EmptyText>
            <Button href="/writing-challenge">
              Submit Your Work
            </Button>
          </EmptyState>
        )}
      </Container>
    </Layout>
  )
}

