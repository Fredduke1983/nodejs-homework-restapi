const nodeMailer = require("nodemailer");

const verifyEmailTransport = async data => {
  const emailLogin = process.env.EMAIL_LOGIN;
  const emailPass = process.env.EMAIL_PASS;

  const email = { ...data, from: emailLogin };

  const transportMail = nodeMailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true,

    auth: {
      user: emailLogin,
      pass: emailPass,
    },
  });

  await transportMail.sendMail(email);
  return true;
};

module.exports = { verifyEmailTransport };
