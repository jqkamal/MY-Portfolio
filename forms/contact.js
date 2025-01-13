
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST route to handle the form submission
app.post('/forms/contact.js', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Setup the email transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like Outlook, Yahoo, etc.
    auth: {
      user: 'ramkamal5886@gmail.com', // Replace with your email
      pass: 'Faizee@123', // Replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: `${name} <${email}>`,
    to: 'ramkamal5886@gmail.com', // Where you want to receive the emails
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send email. Please try again later.' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
