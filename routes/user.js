const { Router } = require("express");
const {
  getUserSignInPage,
  getUserSignUpPage,
  handleUserSignIn,
  handleUserSignUp,
  handleUserLogout,
} = require("../controllers/user");

const router = Router();

router.get("/signin", getUserSignInPage);
router.get("/signup", getUserSignUpPage);

router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserSignIn);

router.get("/logout", handleUserLogout);

module.exports = router;
