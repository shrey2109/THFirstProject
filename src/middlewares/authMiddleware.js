/* eslint-disable no-undef */
import JWT from "jsonwebtoken";

const ensureLogin = async (req, res, next) => {
  try {
    // token is inside header
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "User is not Authorized",
    });
  }
};

export default {ensureLogin};