const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    const { name, email, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password',
        },
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `Contact form submission from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: 'Email sent successfully!' };
    } catch (error) {
        return { statusCode: 500, body: 'Failed to send email.' };
    }
};
