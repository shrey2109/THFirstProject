import authHelper from "../utils/authHelper.js";
import JWT from "jsonwebtoken";
import authValidation from "../utils/validation.js";
import prisma from "../utils/prismaClient.js";

const allUserInfo = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send({ success: true, message: users });
  } catch (error) {
    // This will call errorHandler middleware.
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    // Validation
    const isValid = authValidation.registerValidate(req.body);
    if (!isValid.success) return res.status(400).send(isValid.message);

    const { firstName, lastName, userEmail, password, contactNumber } =
      req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail: userEmail,
      },
    });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User Already Registered Please Login",
      });
    }

    const newHashedPassword = await authHelper.hashedPassword(password);

    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        userEmail: userEmail,
        password: newHashedPassword,
        contactNumber: contactNumber,
      },
    });
    res.status(200).send({ success: true, message: newUser });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // Validation
    const isValid = authValidation.loginValidate(req.body);
    if (!isValid.success) return res.send(isValid);

    const { userEmail, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail: userEmail,
      },
    });

    if (!existingUser) {
      res
        .status(404)
        .send({ status: false, message: "User Information not found" });
    }

    const checkPassword = await authHelper.comparePassword(
      password,
      existingUser?.password
    );

    if (!checkPassword) {
      res.status(422).send({ status: false, message: "Incorrect Password" });
    }

    // eslint-disable-next-line no-undef
    const token = await JWT.sign(existingUser, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      existingUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default { login, register, allUserInfo };
