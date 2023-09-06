const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const LOGOUT_TIME = process.env.LOGOUT_TIME;

const tokensGenerate = (user) => {
  const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: LOGOUT_TIME,
  });

  const refreshToken = jwt.sign(
    { user: { name: user.name } },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return { accessToken, refreshToken };
};

module.exports = tokensGenerate;
