const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).send();
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid token");
  }
};

module.exports = auth;
