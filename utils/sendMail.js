const { createTransport } = require("nodemailer");

const sendMail = async ({ email, subject, html }) => {
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "iojrghu",
    to: email,
    subject,
    html,
  });
};

module.exports = sendMail;
