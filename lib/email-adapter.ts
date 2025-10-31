import nodemailer from 'nodemailer'
import type { EmailAdapter } from 'payload'

/**
 * Email adapter for Payload CMS
 *
 * Development: Logs emails to console
 * Production: Sends via SMTP (requires SMTP_* env vars)
 */
export const emailAdapter: EmailAdapter = ({ payload }) => {
  const isDev = process.env.NODE_ENV !== 'production'

  // Development: Use ethereal email (test SMTP) or console
  if (isDev) {
    return {
      name: 'console-email',
      defaultFromAddress: 'noreply@iismet.com',
      defaultFromName: 'IIS Manufacturing',
      async sendEmail(message) {
        console.log('\n📧 ================== EMAIL ==================')
        console.log('From:', message.from || 'noreply@iismet.com')
        console.log('To:', message.to)
        console.log('Subject:', message.subject)
        console.log('Text:', message.text)
        if (message.html) {
          console.log('HTML:', message.html.substring(0, 200) + '...')
        }
        console.log('==========================================\n')
        return { messageId: `dev-${Date.now()}` }
      },
    }
  }

  // Production: Use nodemailer with SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  return {
    name: 'nodemailer',
    defaultFromAddress: process.env.SMTP_FROM_EMAIL || 'noreply@iismet.com',
    defaultFromName: process.env.SMTP_FROM_NAME || 'IIS Manufacturing',
    async sendEmail(message) {
      try {
        const info = await transporter.sendMail({
          from: message.from || process.env.SMTP_FROM_EMAIL || 'noreply@iismet.com',
          to: message.to,
          subject: message.subject,
          text: message.text,
          html: message.html,
        })
        console.log('✓ Email sent:', info.messageId)
        return info
      } catch (error) {
        console.error('✗ Email send failed:', error)
        throw error
      }
    },
  }
}
