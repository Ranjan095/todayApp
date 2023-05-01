/** @format */

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], "react");
      if (decoded) {
        req.body.authorId=decoded.authorId;
        req.body.author=decoded.author
        console.log(decoded)
        next();
      } else {
        res.status(200).send({ msg: "please login first" });
      }
    } catch (err) {
      res.send({ err: err.message });
    }
  } else {
    res.status(200).send("login first");
  }
};

module.exports = { auth };
