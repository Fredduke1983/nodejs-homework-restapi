const { nanoid } = require("nanoid");
const { errMessage } = require("../../constants/errors");
const { User } = require("../../models");
const { catchAsync, errorUser, emailValidate } = require("../../utils");
const { verifyEmailTransport } = require("../../services/emailService");

const verifyUser = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({
    verificationToken,
  });

  if (!user) {
    errorUser(404, errMessage.errNotFound);
  }

  if (user.verify) {
    res.status(200).json({
      code: 200,
      message: "Your email are allready verified",
    });
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.status(200).json({
    code: 200,
    message: "Email verify success",
  });
});

const resendEmail = catchAsync(async (req, res) => {
  const { error, value } = emailValidate(req.body);
  if (error) {
    errorUser(400, errMessage.errRequest);
  }

  const { email } = value;
  const user = await User.findOne({ email });

  if (!user) {
    errorUser(404, errMessage.errNotFound);
  }

  if (user.verify) {
    errorUser(401, errMessage.errVerify);
  }
  const verificationToken = nanoid();

  await User.findByIdAndUpdate(user._id, {
    verificationToken: verificationToken,
  });

  const html = `<h1>Verify email</h1>
  <a target="_blank" href="http://localhost:3010/api/users/verify/${verificationToken}">Click for verify pls</a>
  `;

  verifyEmailTransport({
    to: value.email,
    subject: "Resend email Verify",
    html: html,
  });

  res.status(200).json({
    message: "OK",
    body: verificationToken,
  });
});

module.exports = { verifyUser, resendEmail };
