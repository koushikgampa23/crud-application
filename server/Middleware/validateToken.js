const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.status(501).json({ message: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantSecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(501).json(err);
  }
};

module.exports = { validateToken };
