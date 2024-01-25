import prisma from "../utils/prismaClient.js";
import validation from "../utils/validation.js";
import findHelper from "../services/findHelper.js";

// Create a new Comment
const create = async (req, res, next) => {
  try {
    // Validation
    const isValid = validation.commentValidate(req.body);
    if (!isValid.success) return res.status(400).send(isValid.message);

    const { description } = req.body;
    const author = req.user;
    const postId = parseInt(req.params.postId);

    const comment = await prisma.comment.create({
      data: {
        description,
        author: {
          connect: { id: parseInt(author.id) },
        },
        post: {
          connect: { id: postId },
        },
      },
    });

    res.status(200).send({ success: true, message: comment });
  } catch (error) {
    next(error);
  }
};

// Get all Comments
const allComments = async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany();
    res.status(200).send({ success: true, message: comments });
  } catch (error) {
    next(error);
  }
};

// Get a Particular comment
const getComment = async (req, res, next) => {
  try {
    const commentId = parseInt(req.params.commentId);
    const comment = await findHelper.findComment(commentId);
    if (comment) res.status(200).send({ success: true, message: comment });
    res.status(200).send({
      success: false,
      message: "No Comment is available for particular comment id",
    });
  } catch (error) {
    next(error);
  }
};

// Update a Comment
const update = async (req, res, next) => {
  try {
    const visitor = req.user;
    const dataToBeUpdated = req.body;
    const commentId = parseInt(req.params.commentId);

    const comment = await findHelper.findComment(commentId);
    if (!comment) {
      res.status(200).send({
        success: false,
        message: "No Comment is available for particular comment id",
      });
    }

    const author = await findHelper.findUser(parseInt(comment.authorId));

    if (!(comment.authorId === visitor.id || author.managerId === visitor.id))
      res.status(401).send({
        success: false,
        message: "User is not authorized to perform this action",
      });

    const updateComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        description: dataToBeUpdated.description,
      },
    });
    res.status(200).send({ success: true, message: updateComment });
  } catch (error) {
    next(error);
  }
};

// Delete a Comment
const remove = async (req, res, next) => {
  try {
    const visitor = req.user;
    const commentId = parseInt(req.params.commentId);

    const comment = await findHelper.findComment(commentId);
    if (!comment) {
      res.status(200).send({
        success: false,
        message: "No Comment is available for particular comment id",
      });
    }

    const postAuthor = await findHelper.findPost(parseInt(comment.postId));
    const commentAuthor = await findHelper.findComment(commentId);

    if (
      !(
        visitor.role === "SUPERUSER" ||
        visitor.id === comment.authorId ||
        visitor.id === postAuthor.id ||
        visitor.id === postAuthor.managerId ||
        visitor.id === commentAuthor.managerId ||
        (commentAuthor.role === "SUPERUSER" && postAuthor.role !== "SUPERUSER")
      )
    ) {
      res.status(401).send({
        success: false,
        message: "User is not authorized to perform this action",
      });
    }

    const deleteComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    res.status(200).send({ success: true, message: deleteComment });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getComment,
  allComments,
  update,
  remove,
};
