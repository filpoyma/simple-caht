const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const tokensGenerate = (user) => {
  const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: "3m",
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
