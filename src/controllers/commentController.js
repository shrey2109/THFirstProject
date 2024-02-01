import prisma from "../utils/prismaClient.js";
import validation from "../utils/validation.js";
import findHelper from "../services/findHelper.js";

// Create a new Comment
const create = async (req, res, next) => {
  try {
    // Validation
    const isValid = validation.commentValidate(req.body);
    if (!isValid.success)
      return res.status(400).send({ data: "", error: isValid.message });

    const { description } = req.body;
    const author = req.user;
    const postId = parseInt(req.params.postId);

    const post = await findHelper.findPost(postId);
    if (!post) {
      return res.status(404).send({
        data: "",
        error: "No post is available for particular post id",
      });
    }

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

    return res.status(201).send({ data: comment, error: "" });
  } catch (error) {
    next(error);
  }
};

// Get all Comments
const allComments = async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany();
    return res.status(200).send({ data: comments, error: "" });
  } catch (error) {
    next(error);
  }
};

// Get a Particular comment
const getComment = async (req, res, next) => {
  try {
    const commentId = parseInt(req.params.commentId);
    const comment = await findHelper.findComment(commentId);
    if (comment) return res.status(200).send({ data: comment, error: "" });
    return res.status(404).send({
      data: "",
      error: "No Comment is available for particular comment id",
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
      return res.status(404).send({
        data: "",
        error: "No Comment is available for particular comment id",
      });
    }

    const commentAuthor = await findHelper.findUser(parseInt(comment.authorId));

    if (
      !(
        comment.authorId === visitor.id ||
        commentAuthor.managerId === visitor.id
      )
    ) {
      return res.status(401).send({
        data: "",
        error: "User is not authorized to perform this action",
      });
    }

    if (!dataToBeUpdated.description)
      return res.status(409).send({
        data: "",
        error: "Please provide data to update comment",
      });

    const updateComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        description: dataToBeUpdated.description,
        updatedAt: new Date().toISOString(),
      },
    });
    return res.status(200).send({ data: updateComment, error: "" });
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
      return res.status(404).send({
        data: "",
        error: "No Comment is available for particular comment id",
      });
    }

    const postAuthor = await findHelper.findUser(parseInt(comment.postId));
    const commentAuthor = await findHelper.findUser(parseInt(comment.authorId));

    if (
      (visitor.role !== "SUPERUSER" &&
        visitor.id !== comment.authorId &&
        visitor.id !== postAuthor.id &&
        visitor.id !== postAuthor.managerId &&
        visitor.id !== commentAuthor.managerId) ||
      (commentAuthor.role === "SUPERUSER" && visitor.role !== "SUPERUSER")
    ) {
      return res.status(401).send({
        data: "",
        message: "User is not authorized to perform this action",
      });
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return res.status(200).send({ data: "The comment is deleted", error: "" });
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
