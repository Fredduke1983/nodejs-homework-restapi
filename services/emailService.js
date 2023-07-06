const nodeMailer = require("nodemailer");

const verifyEmailTransport = async data => {
  const email = { ...data, from: "ihor.nechai@meta.ua" };

  const transportMail = nodeMailer.createTransport({
    host: "smtp.meta.ua",
    port: 465,
    secure: true,

    auth: {
      user: "ihor.nechai@meta.ua",
      pass: "Mailware_2",
    },
  });

  console.log("EMAIL ---", email);

  await transportMail.sendMail(email);
  return true;
};

module.exports = { verifyEmailTransport };
