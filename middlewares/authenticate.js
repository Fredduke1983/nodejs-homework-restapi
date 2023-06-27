const jwt = require("jsonwebtoken");
const { errMessage } = require("../constants/errors");
const { errorUser } = require("../utils/errorUser");
const { User } = require("../models");
const { catchAsync } = require("../utils");

exports.authenticate = catchAsync(async (req, res, next) => {
  const { SECRET_KEY } = process.env;
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") errorUser(401, errMessage.errAuth);

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token)
      errorUser(404, errMessage.errNotFound);

    req.user = user;
  } catch (error) {
    errorUser(401, errMessage.errAuth);
  }

  next();
});
