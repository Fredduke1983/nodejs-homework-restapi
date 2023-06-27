const { errMessage } = require("../constants/errors");
const { User } = require("../models");
const { errorUser, catchAsync } = require("../utils");

exports.uniqueUserValidate = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: `${req.body.email}` });

  if (user) {
    errorUser(409, errMessage.errUniq);
  }
  next();
});
