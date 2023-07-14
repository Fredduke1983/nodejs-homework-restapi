const { Router } = require("express");
const UploadAvatar = require("../../controllers/users/avatarUpdate");
const { uniqueUserValidate, authenticate } = require("../../middlewares/");
const {
  signupUser,
  signinUser,
  getCurrent,
  logout,
  subscriptUpdate,
  verifyUser,
  resendEmail,
} = require("../../controllers/users/");
const changeAvatar = require("../../controllers/users/changeAvatar");
const router = Router();

router.post("/register", uniqueUserValidate, signupUser);
router.get("/verify/:verificationToken", verifyUser);
router.post("/verify", resendEmail);
router.post("/login", signinUser);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/avatars",
  authenticate,
  UploadAvatar.upload("avatar"),
  changeAvatar
);
router.patch("/:id", authenticate, subscriptUpdate);

module.exports = router;
