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
    return res.status(400).json({ msg: "Enter complete Details" });

  const user = await userModel.findOne({
    email,
    password,
  });

  if (!user) return res.status(404).json({ msg: "User not found" });

  res.redirect("/");
}

module.exports = {
  getUserSignInPage,
  getUserSignUpPage,
  handleUserSignIn,
  handleUserSignUp,
};
