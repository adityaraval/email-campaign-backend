require('dotenv').config();

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send = async (mailObject) => {
  try {
    await sgMail.send(mailObject);
  } catch (err) {
    console.log('Error while send Email : ', err.response.body.errors);
    throw err;
  }
};

module.exports = {
  send
};