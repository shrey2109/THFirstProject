import findHelper from "../services/findHelper.js";
import prisma from "../utils/prismaClient.js";

const addSuperUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await findHelper.findUser(id);
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User Information not found for userId",
      });
    }

    if (user.role === "SUPERUSER") {
      return res
        .status(200)
        .send({ status: true, message: "User is already a superuser." });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        role: "SUPERUSER",
      },
    });
    return res.status(200).send({ success: true, message: updatedUser });
  } catch (error) {
    next(error);
  }
};

const removeSuperUser = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const id = parseInt(req.params.id);
    if (currentUser.id === id)
      return res.status(406).send({
        success: false,
        message: "Self role deallocation is not allowed.",
      });
    const user = await findHelper.findUser(id);
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User Information not found for userId",
      });
    }

    if (user.role === "USER") {
      return res
        .status(200)
        .send({ status: true, message: "User is already a normal user." });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        role: "USER",
      },
    });
    return res.status(200).send({ success: true, message: updatedUser });
  } catch (error) {
    next(error);
  }
};

const allocateManager = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const managerId = parseInt(req.params.managerId);

    const user = await findHelper.findUser(userId);
    const manager = await findHelper.findUser(managerId);

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User Information not found for userId",
      });
    }
    if (!manager) {
      return res.status(404).send({
        status: false,
        message: "User information not found for managerId",
      });
    }

    if (user.managerId === managerId) {
      return res.status(200).send({
        success: true,
        message: "This manager is already assigned to the user.",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        managerId: managerId,
      },
    });
    return res.status(200).send({ success: true, message: updatedUser });
  } catch (error) {
    next(error);
  }
};

const deallocateManager = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await findHelper.findUser(userId);

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User Information not found for userId",
      });
    }

    if (user.managerId === null) {
      return res.status(200).send({
        success: true,
        message: "Already no manager assigned to this user",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        managerId: null,
      },
    });
    return res.status(200).send({ success: true, message: updatedUser });
  } catch (error) {
    next(error);
  }
};

export default {
  addSuperUser,
  removeSuperUser,
  allocateManager,
  deallocateManager,
};
