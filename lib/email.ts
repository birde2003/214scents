// Email utility functions
// In a production environment, you would integrate with services like SendGrid, Resend, or AWS SES

export interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  // TODO: Implement actual email sending logic
  // For now, just log the email
  console.log('Email sent:', options)
  return true
}

export async function sendOrderConfirmationEmail(
  email: string,
  orderNumber: string,
  total: number,
  currency: string = 'USD'
) {
  const subject = `Order Confirmation - ${orderNumber}`
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #D4AF37;">Thank You for Your Order!</h1>
          <p>Your order has been confirmed and is being processed.</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Order Details</h2>
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Total:</strong> ${new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(total)}</p>
          </div>
          <p>We'll send you a shipping confirmation email as soon as your order ships.</p>
          <p style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/account/orders/${orderNumber}" 
               style="background: #D4AF37; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Order Details
            </a>
          </p>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            If you have any questions, please contact us at support@214scents.com
          </p>
        </div>
      </body>
    </html>
  `

  return await sendEmail({ to: email, subject, html })
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  const subject = 'Reset Your Password - 214 Scents'
  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #D4AF37;">Reset Your Password</h1>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <p style="margin: 30px 0;">
            <a href="${resetLink}" 
               style="background: #D4AF37; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            This link will expire in 1 hour.
          </p>
        </div>
      </body>
    </html>
  `

  return await sendEmail({ to: email, subject, html })
}

export async function sendOrderStatusUpdateEmail(
  email: string,
  orderNumber: string,
  status: string,
  trackingNumber?: string
) {
  const subject = `Order Update - ${orderNumber}`
  let statusMessage = ''

  switch (status) {
    case 'PAID':
      statusMessage = 'Your payment has been confirmed.'
      break
    case 'PROCESSING':
      statusMessage = 'Your order is being prepared for shipment.'
      break
    case 'SHIPPED':
      statusMessage = trackingNumber
        ? `Your order has been shipped! Tracking number: ${trackingNumber}`
        : 'Your order has been shipped!'
      break
    case 'DELIVERED':
      statusMessage = 'Your order has been delivered. We hope you enjoy your purchase!'
      break
    default:
      statusMessage = `Your order status has been updated to: ${status}`
  }

  const html = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #D4AF37;">Order Status Update</h1>
          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p>${statusMessage}</p>
          <p style="margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/account/orders/${orderNumber}" 
               style="background: #D4AF37; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Order Details
            </a>
          </p>
        </div>
      </body>
    </html>
  `

  return await sendEmail({ to: email, subject, html })
}
