import { PrismaClient } from "@prisma/client";
import { hashedPassword, comparePassword } from "../helper/authHelper";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

const allUserInfoController = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const registerController = async (req, res) => {
  try {
    const { firstName, lastName, userEmail, password, contactNumber } =
      req.body;

    // Validations
    if (!firstName) {
      return res.send({ message: "First Name is Required." });
    }
    if (!lastName) {
      return res.send({ message: "Last Name is Required." });
    }
    if (!userEmail) {
      return res.send({ message: "Email is Required." });
    }
    if (!password) {
      return res.send({ message: "Password is Required." });
    }
    if (!contactNumber) {
      return res.send({ message: "Contact Number is Required." });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail: userEmail,
      },
    });
    if (existingUser) {
      return res.send({
        message: "User Already Registered Please Login",
      });
    }

    const newHashedPassword = await hashedPassword(password);
    console.log(newHashedPassword);

    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        userEmail: userEmail,
        password: newHashedPassword,
        contactNumber: contactNumber,
      },
    });
    console.log("Created new user: ", newUser);
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    // Validations
    if (!userEmail) {
      return res.send({ message: "Email is Required." });
    }
    if (!password) {
      return res.send({ message: "Password is Required." });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        userEmail: userEmail,
      },
    });

    if (!existingUser) {
      res.send({ message: "User Information not found" });
      res.json(existingUser);
    }

    const checkPassword = await comparePassword(
      password,
      existingUser?.password
    );

    if (!checkPassword) {
      res.send({ message: "Incorrect Password" });
    }

    // eslint-disable-next-line no-undef
    const token = await sign(existingUser, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      existingUser,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export default { allUserInfoController, registerController, loginController };
