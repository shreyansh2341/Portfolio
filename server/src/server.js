const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { success: false, error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

// Serve static PDF resume/CV files if needed
app.use('/pdfs', express.static(path.join(__dirname, '../..')));

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Please provide all fields.' });
  }
  
  console.log(`[Contact Form Submission] Received message from ${name} (${email})`);
  
  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      replyTo: email,
      to: process.env.EMAIL_USER, // Sends the email to yourself
      subject: `Portfolio Contact: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\\n/g, '<br/>')}</p>
      `
    });

    res.json({ success: true, message: 'Thank you for your message! It has been successfully sent to Shreyansh.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send message. Please make sure email credentials are configured properly.' });
  }
});

// Serve health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', time: new Date() });
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
