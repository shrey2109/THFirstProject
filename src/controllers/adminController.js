import findHelper from "../services/findHelper.js";
import prisma from "../utils/prismaClient.js";

const allocate = async (req, res, next) => {
  try {
    const { task, taskId } = req.body;
    const userId = parseInt(req.params.id);
    const user = await findHelper.findUser(userId);
    if (!user) {
      return res.status(404).send({
        data: "",
        error: "User Information not found for userId",
      });
    }
    if (task === "SUPERUSER") {
      if (user.role === "SUPERUSER") {
        return res
          .status(409)
          .send({ data: "", error: "User is already a superuser." });
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          role: "SUPERUSER",
        },
      });
      delete updatedUser.password;
      return res.status(200).send({ data: updatedUser, error: "" });
    } else if (task === "MANAGER") {
      if (!taskId) {
        return res
          .status(409)
          .send({ data: "", error: "Please provide manager id." });
      }
      const managerId = parseInt(taskId);

      const manager = await findHelper.findUser(managerId);

      if (!manager) {
        return res.status(404).send({
          data: "",
          error: "User information not found for managerId",
        });
      }

      if (userId === managerId) {
        return res.status(406).send({
          data: "",
          error: "Can not self assign manager.",
        });
      }

      if (user.managerId === managerId) {
        return res.status(409).send({
          data: "",
          error: "This manager is already assigned to the user.",
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
      delete updatedUser.password;
      return res.status(200).send({ data: updatedUser, error: "" });
    }
  } catch (error) {
    next(error);
  }
};

const deallocate = async (req, res, next) => {
  try {
    const { task } = req.body;
    const userId = parseInt(req.params.id);
    const user = await findHelper.findUser(userId);

    if (!user) {
      return res.status(404).send({
        data: "",
        message: "User Information not found for userId",
      });
    }

    if (task === "SUPERUSER") {
      if (user.role === "USER") {
        return res
          .status(409)
          .send({ data: "", error: "User is already a normal user." });
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          role: "USER",
        },
      });
      delete updatedUser.password;
      return res.status(200).send({ data: updatedUser, error: "" });
    } else if (task === "MANAGER") {
      if (user.managerId === null) {
        return res.status(409).send({
          data: "",
          error: "Already no manager assigned to this user",
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
      delete updatedUser.password;
      return res.status(200).send({ data: updatedUser, error: "" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  allocate,
  deallocate,
};
