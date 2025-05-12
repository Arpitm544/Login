
const nodemailer = require('nodemailer');

// Email transport configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendPasswordResetEmail = async (email, resetUrl) => {
  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) requested a password reset.
      Please click on the following link, or paste it into your browser to complete the process:
      ${resetUrl}
      If you did not request this, please ignore this email and your password will remain unchanged.`
  };
  
  await transporter.sendMail(mailOptions);
};

const sendPasswordResetConfirmation = async (email) => {
  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'Your password has been changed',
    text: `Hello,
      This is a confirmation that the password for your account ${email} has just been changed.`
  };
  
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendPasswordResetEmail,
  sendPasswordResetConfirmation
};
