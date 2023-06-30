const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { errMessage } = require("../../constants/errors");
const { User } = require("../../models");
const { catchAsync, errorUser } = require("../../utils");
const { userSignupValidator } = require("../../utils/");

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
  console.log(hashedEmail);

  const hashedPass = await bcrypt.hash(value.password, 10);

  const newUser = await User.create({
    ...value,
    password: hashedPass,
    avatarURL: `https://www.gravatar.com/avatar/${hashedEmail}.jpg?d=wavatar`,
  });

  res.status(201).json({
    message: "New user added",
    user: newUser,
  });
});
