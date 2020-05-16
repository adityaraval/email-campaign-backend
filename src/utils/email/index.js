const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 *  using transporter send email via SMTP
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 * @param {Array} attachments
 */
const send = async (to, subject, html, attachments) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html,
    attachments,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log('Error while send Email : ', err);
    throw err;
  }
};

module.exports = {
  send,
};
