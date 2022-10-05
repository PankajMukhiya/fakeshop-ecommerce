const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config.env" });
const sendEmail = async (options) => {
  //transporter
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  //mailOptions
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //now the send the mail using transporter
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
