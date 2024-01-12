const JWT = require("jsonwebtoken");

const requireSignIn = async (req, res, next) => {
  try {
    // token is inside header
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "User is not Authorizaed",
    });
  }
};

module.exports = { requireSignIn };
