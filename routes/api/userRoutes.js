const { Router } = require("express");

const { uniqueUserValidate, authenticate } = require("../../middlewares/");
const {
  signupUser,
  signinUser,
  getCurrent,
  logout,
  subscriptUpdate,
} = require("../../controllers/users/");
const router = Router();

router.post("/register", uniqueUserValidate, signupUser);
router.post("/login", signinUser);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch("/:id", authenticate, subscriptUpdate);

module.exports = router;
