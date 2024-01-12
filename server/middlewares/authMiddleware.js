/* eslint-disable no-undef */
import { verify } from "jsonwebtoken";

const requireSignIn = async (req, res, next) => {
  try {
    // token is inside header
    const decode = verify(req.headers.authorization, process.env.SECRET_KEY);
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

export default { requireSignIn };
