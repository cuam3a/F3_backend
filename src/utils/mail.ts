var nodemailer = require("nodemailer");

export const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: { user: process.env.SMTP_USERNAME, pass: process.env.SMTP_PASSWORD },
  // tls: {
  //   rejectUnauthorized: false,
  // },
});
