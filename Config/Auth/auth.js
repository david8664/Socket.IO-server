const jwt = require("jsonwebtoken"),
  SECRET = process.env.SECRET;

const create = (data, secretName, expireTime) => {
  return jwt.sign(data, secretName, { expiresIn: expireTime });
};

const verify = (token, secretName) => {
  if (!token) {
    throw { code: 401, msg: "Invalid token" };
  }

  try {
    return jwt.verify(token, secretName);
  } catch (err) {
    throw { code: err.code || 401, msg: err.msg || "Unauthorized" };
  }
};

const createLoginToken = (data) => create(data, SECRET, "12h");

const verifyLoginToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    const decodedToken = verify(token, SECRET);
    req.email = decodedToken.email;
    next();
  } catch (err) {
    res.status(err.code || 401).send(err.msg || "Unauthorized");
  }
};

module.exports = { createLoginToken, verifyLoginToken };
