import authHelper from "../utils/authHelper.js";
import JWT from "jsonwebtoken";
import validation from "../utils/validation.js";
import prisma from "../utils/prismaClient.js";
import findHelper from "../services/findHelper.js";

const register = async (req, res, next) => {
  try {
    // Validation
    const isValid = validation.registerValidate(req.body);
    if (!isValid.success)
      return res.status(400).send({ data: "", error: isValid.message });

    const { firstName, lastName, email, password, contactNumber } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(409).send({
        data: "",
        error: "User Already Registered Please Login",
      });
    }

    const newHashedPassword = await authHelper.hashedPassword(password);

    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: newHashedPassword,
        contactNumber: contactNumber,
      },
    });
    delete newUser.password;
    return res.status(201).send({ data: newUser, error: "" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // Validation
    const isValid = validation.loginValidate(req.body);
    if (!isValid.success) return res.send(isValid);

    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return res
        .status(404)
        .send({ data: "", error: "User Information not found" });
    }

    const checkPassword = await authHelper.comparePassword(
      password,
      existingUser?.password
    );

    if (!checkPassword) {
      return res.status(422).send({ data: "", error: "Incorrect Password" });
    }

    // eslint-disable-next-line no-undef
    const token = await JWT.sign(existingUser, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      data: "Login Successfully",
      error: "",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const allUserInfo = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    const allUsers = users.map((u) => {
      delete u.password;
    });
    return res.status(200).send({ data: allUsers, error: "" });
  } catch (error) {
    // This will call errorHandler middleware.
    // next(error);
  }
};

const userInfo = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const visitor = req.user;
    if (visitor.role !== "SUPERUSER" && visitor.id !== id) {
      return res.status(406).send({
        data: "",
        error: "User is not authorized to perform this action",
      });
    }
    const user = await findHelper.findUser(id);
    if (!user) {
      return res.status(404).send({
        data: "",
        error: "No user found for this particular user id",
      });
    }

    delete user.password;
    return res.status(200).send({
      data: user,
      error: "",
    });
  } catch (error) {
    next(error);
  }
};

export default { login, register, allUserInfo, userInfo };
