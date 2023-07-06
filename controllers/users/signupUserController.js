const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { nanoid } = require("nanoid");

const { errMessage } = require("../../constants/errors");
const { User } = require("../../models");
const { catchAsync, errorUser } = require("../../utils");
const { userSignupValidator } = require("../../utils/");
const { verifyEmailTransport } = require("../../services/emailService");

exports.signupUser = catchAsync(async (req, res) => {
  const { error, value } = userSignupValidator(req.body);

  if (error) {
    if (error.message.includes("name")) {
      errorUser(400, errMessage.errName);
    }
    if (error.message.includes("password")) {
      errorUser(400, errMessage.errPass);
    }

    return res.status(400).json({
      message: `${error.message}`,
    });
  }
  const hashedEmail = await crypto
    .createHash("md5")
    .update(value.email)
    .digest("hex");

  const hashedPass = await bcrypt.hash(value.password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...value,
    verificationToken,
    password: hashedPass,
    avatarURL: `https://www.gravatar.com/avatar/${hashedEmail}.jpg?d=wavatar`,
  });

  const html = `<h1>Verify email</h1>
  <a target="_blank" href="http://localhost:3010/api/users/verify/${verificationToken}">Click for verify pls</a>
  `;

  verifyEmailTransport({
    to: value.email,
    subject: "Email Verify",
    html: html,
  });

  res.status(201).json({
    message: "New user added",
    user: newUser,
  });
});
