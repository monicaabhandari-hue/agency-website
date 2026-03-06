const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = 5050
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

// Middleware
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
)
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Configure Nodemailer transporter for Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Verify transporter configuration on startup (optional but helpful)
transporter.verify((error) => {
  if (error) {
    console.error('Error configuring email transporter:', error.message)
  } else {
    console.log('Email transporter ready to send messages')
  }
})

// POST /contact endpoint
app.post('/contact', async (req, res) => {
  const { name, email, phone, interest, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and message are required.',
    })
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `New Contact Request - ${interest || 'General Inquiry'}`,
    text: `
New contact request from Dahal Agency website:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Interest: ${interest || 'Not specified'}

Message:
${message}
    `.trim(),
  }

  try {
    await transporter.sendMail(mailOptions)

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent. A representative will contact you shortly.',
    })
  } catch (error) {
    console.error('Error sending contact email:', error)
    return res.status(500).json({
      success: false,
      error: 'There was a problem sending your message. Please try again later.',
    })
  }
})
console.log("PORT ENV:", process.env.PORT)
app.listen(PORT, () => {
  console.log(`Dahal Agency backend is running on port ${PORT}`)
})

