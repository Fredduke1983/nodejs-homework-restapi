const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errMessage } = require("../../constants/errors");
const { User } = require("../../models");
const { catchAsync, errorUser } = require("../../utils");
const { userSigninValidator } = require("../../utils/userValidator");

exports.signinUser = catchAsync(async (req, res) => {
  const { SECRET_KEY } = process.env;
  const { error, value } = userSigninValidator(req.body);

  if (error) {
    errorUser(401, errMessage.errLogin);
  }

  const user = await User.findOne({ email: value.email });
  if (!user) errorUser(401, errMessage.errLogin);

  const comparePass = await bcrypt.compare(value.password, user.password);
  if (!comparePass) errorUser(401, errMessage.errLogin);

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
  });
});
