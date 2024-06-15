const { Router } = require("express");
const {
  getUserSignInPage,
  getUserSignUpPage,
  handleUserSignIn,
  handleUserSignUp,
} = require("../controllers/user");

const router = Router();

router.get("/signin", getUserSignInPage);
router.get("/signup", getUserSignUpPage);

router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserSignIn);

module.exports = router;
