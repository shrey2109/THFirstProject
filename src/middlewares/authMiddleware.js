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
    return res.status(401).send({
      success: false,
      message: "User is not Authorized",
    });
  }
};

const ensureAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "SUPERUSER") next();
    else throw new Error("No admin");
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "User does not have admin rights.",
    });
  }
};

export default { ensureLogin, ensureAdmin };
