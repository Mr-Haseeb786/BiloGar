const { userModel } = require("../models/user");

function getUserSignInPage(req, res) {
  return res.render("signin");
}
function getUserSignUpPage(req, res) {
  return res.render("signup");
}

async function handleUserSignUp(req, res) {
  if (!req.body) return res.status(400).json({ msg: "Seriously?" });

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password)
    return res.status(400).json({ msg: "Enter Complete Details" });

  userModel.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/");
}
async function handleUserSignIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).render("signin", {
      error: "Please enter complete details",
    });

  try {
    const token = await userModel.matchPasswordAndCreateToken(email, password);
    res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("signin", {
      error: error.message,
    });
  }
}

function handleUserLogout(req, res) {
  return res.clearCookie("token").redirect("/");
}

module.exports = {
  getUserSignInPage,
  getUserSignUpPage,
  handleUserSignIn,
  handleUserSignUp,
  handleUserLogout,
};
