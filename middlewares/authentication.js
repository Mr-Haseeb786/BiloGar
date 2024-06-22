const { validateToken } = require("../utils/authentication");

function checkForAuthentications(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) return next();

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      console.log(error);
    }

    next();
  };
}

module.exports = {
  checkForAuthentications,
};
