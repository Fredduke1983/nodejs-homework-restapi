const { getCurrent } = require("./getCurrent");
const { logout } = require("./logout");
const { signinUser } = require("./signinUserController");
const { signupUser } = require("./signupUserController");
const { subscriptUpdate } = require("./subscriptUpdate");
const { verifyUser, resendEmail } = require("./verifyUser");

module.exports = {
  signupUser,
  signinUser,
  getCurrent,
  logout,
  subscriptUpdate,
  verifyUser,
  resendEmail,
};
