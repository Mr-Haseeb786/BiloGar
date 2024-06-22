const JWT = require("jsonwebtoken");

const secretKey = "J@$$0pInd!?";

function createTokenForUser(user) {
  const payload = {
    id: user._id,
    name: user.fullName,
    email: user.email,
    profileImgUrl: user.profileImgUrl,
    role: user.role,
  };

  const token = JWT.sign(payload, secretKey);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secretKey);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
