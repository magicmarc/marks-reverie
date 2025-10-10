import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const workTitle = formData.get('workTitle') as string
    const file = formData.get('file') as File

    // Validate required fields
    if (!name || !email || !phone || !workTitle || !file) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Convert file to buffer for email attachment
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false, // use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Writing Challenge Submission: ${workTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
            New Writing Challenge Submission
          </h2>
          
          <div style="background-color: #f5f3f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1a1a1a;">Submission Details</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a4a4a;">Work Title:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${workTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a4a4a;">Author Name:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a4a4a;">Email:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">
                  <a href="mailto:${email}" style="color: #d4af37;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a4a4a;">Phone:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a4a4a;">File Name:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${file.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a4a4a;">File Size:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${(file.size / 1024).toFixed(2)} KB</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a4a4a;">Submitted At:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #4a4a4a; font-style: italic; margin-top: 20px;">
            The submitted work is attached to this email.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e8e4dc; color: #8a8a8a; font-size: 12px;">
            <p>This is an automated email from the Writing Challenge submission form on Mark's Reverie.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Submission received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { 
        message: 'Failed to process submission. Please check your email configuration.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
