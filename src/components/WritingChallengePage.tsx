'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import Layout from '@/components/Layout/Layout'

const Container = styled.div`
  max-width: 800px;
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


const Description = styled.div`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.text.secondary};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  text-align: left;
  
  p {
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`

const FormCard = styled.div`
  background: ${props => props.theme.colors.background.paper};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: 12px;
  padding: 3rem;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`

const Label = styled.label`
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.typography.fontFamily.sans};
`

const Required = styled.span`
  color: ${props => props.theme.colors.accent.gold};
  margin-left: 4px;
`

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  border: 1px solid ${props => props.theme.colors.border.light};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background.main};
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.typography.fontFamily.sans};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent.gold};
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.muted};
  }
`

const FileInputWrapper = styled.div`
  position: relative;
  border: 2px dashed ${props => props.theme.colors.border.medium};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  background: ${props => props.theme.colors.background.subtle};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.theme.colors.accent.gold};
    background: ${props => props.theme.colors.background.main};
  }

  &.drag-over {
    border-color: ${props => props.theme.colors.accent.gold};
    background: rgba(212, 175, 55, 0.05);
  }
`

const FileInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`

const FileInputLabel = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: ${props => props.theme.typography.fontSize.base};
  pointer-events: none;

  .icon {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  .text {
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  .hint {
    font-size: ${props => props.theme.typography.fontSize.sm};
    color: ${props => props.theme.colors.text.muted};
  }
`

const FileName = styled.div`
  margin-top: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background.main};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};

  .name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .remove {
    color: ${props => props.theme.colors.accent.gold};
    cursor: pointer;
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    
    &:hover {
      color: ${props => props.theme.colors.text.primary};
    }
  }
`

const SubmitButton = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: white;
  background: ${props => props.theme.colors.accent.gold};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${props => props.theme.typography.fontFamily.sans};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.text.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const Message = styled.div<{ $type: 'success' | 'error' }>`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.$type === 'success' 
    ? 'rgba(156, 175, 136, 0.1)' 
    : 'rgba(212, 175, 55, 0.1)'};
  border: 1px solid ${props => props.$type === 'success' 
    ? props.theme.colors.accent.sage 
    : props.theme.colors.accent.gold};
  color: ${props => props.theme.colors.text.primary};
  font-size: ${props => props.theme.typography.fontSize.base};
  margin-bottom: ${props => props.theme.spacing.xl};
`

export default function WritingChallengePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    workTitle: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('email', formData.email)
      submitData.append('phone', formData.phone)
      submitData.append('workTitle', formData.workTitle)
      if (file) {
        submitData.append('file', file)
      }

      const response = await fetch('/api/submissions', {
        method: 'POST',
        body: submitData,
      })

      if (response.ok) {
        // Redirect to success page with submission data
        const params = new URLSearchParams({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          workTitle: formData.workTitle,
          fileName: file?.name || 'unknown',
          submittedAt: new Date().toISOString(),
        })
        router.push(`/writing-challenge/success?${params.toString()}`)
      } else {
        const error = await response.json()
        setMessage({
          type: 'error',
          text: error.message || 'Something went wrong. Please try again.'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to submit. Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout>
      <Container>
        <Header>
          <Title>Writing Challenge</Title>
        </Header>

        <Description>
          <p>
            I'm inviting submissions for this Writing Challenge. Send me what lingers in your mind: 
            a brief story, a reflection, a poem, a review of a book that moved you. Anything that carries a pulse.
          </p>
          <p>
            Selected pieces will be featured on my website — not as trophies, but as conversations.
          </p>
          <p>
            Let's talk about writing. About the strange, quiet art of trying to make sense of the world with words.
          </p>
        </Description>


        <FormCard>
          {message && (
            <Message $type={message.type}>
              {message.text}
            </Message>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>
                Name<Required>*</Required>
              </Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                Email<Required>*</Required>
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                Phone<Required>*</Required>
              </Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+61 XXX XXX XXX"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                Title<Required>*</Required>
              </Label>
              <Input
                type="text"
                name="workTitle"
                value={formData.workTitle}
                onChange={handleInputChange}
                placeholder="The title of your piece"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                Upload Your Work<Required>*</Required>
              </Label>
              <FileInputWrapper
                className={dragOver ? 'drag-over' : ''}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <FileInput
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.md"
                  required={!file}
                />
                <FileInputLabel>
                  <div className="icon">📄</div>
                  <div className="text">
                    {file ? 'Change file' : 'Click to upload or drag and drop'}
                  </div>
                  <div className="hint">
                    PDF, DOC, DOCX, TXT, or MD (Max 10MB)
                  </div>
                </FileInputLabel>
              </FileInputWrapper>
              
              {file && (
                <FileName>
                  <span className="name">{file.name}</span>
                  <span className="remove" onClick={handleRemoveFile}>Remove</span>
                </FileName>
              )}
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Your Work'}
            </SubmitButton>
          </Form>
        </FormCard>
      </Container>
    </Layout>
  )
}

