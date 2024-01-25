import findHelper from "../services/findHelper.js";
import prisma from "../utils/prismaClient.js";
import validation from "../utils/validation.js";

// Create a new Post
const create = async (req, res, next) => {
  try {
    // validation
    const isValid = validation.postValidate(req.body);
    if (!isValid.success) return res.status(400).send(isValid.message);

    const { title, description } = req.body;
    const author = req.user;
    const post = await prisma.post.create({
      data: {
        title,
        description,
        author: {
          connect: { id: author.id },
        },
      },
    });

    res.status(200).send({ success: true, message: post });
  } catch (error) {
    next(error);
  }
};

// Get all Posts
const allPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).send({ success: true, message: posts });
  } catch (error) {
    next(error);
  }
};

// Get a Particular Post
const getPost = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await findHelper.findPost(postId);
    if (post) res.status(200).send({ success: true, message: post });
    res.status(200).send({
      success: false,
      message: "No post available for particular post id",
    });
  } catch (error) {
    next(error);
  }
};

// Update a Post
const update = async (req, res, next) => {
  try {
    const visitor = req.user;
    const postId = parseInt(req.params.id);
    const dataToBeUpdated = req.body;

    const post = await findHelper.findPost(postId);
    if (!post) {
      res.status(200).send({
        success: false,
        message: "No post available for particular post id",
      });
    }

    const postAuthor = await findHelper.findUser(post.authorId);

    if (!(post.authorId === visitor.id || postAuthor.managerId === visitor.id)){

      res.status(401).send({
        success: false,
        message: "User is not authorized to perform this action",
      });
      return;
    }

    let updatePost;
    if (dataToBeUpdated.title) {
      updatePost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          title: dataToBeUpdated.title,
        },
      });
    }
    if (dataToBeUpdated.description) {
      updatePost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          description: dataToBeUpdated.description,
        },
      });
    }
    res.status(200).send({ success: true, message: updatePost });
  } catch (error) {
    next(error);
  }
};

// Delete a Post
const remove = async (req, res, next) => {
  try {
    const visitor = req.user;
    const postId = parseInt(req.params.id);

    const post = await findHelper.findPost(postId);
    if (!post) {
      res.status(200).send({
        success: false,
        message: "No post available for particular post id",
      });
    }

    const postAuthor = await findHelper.findUser(post.authorId);

    if (
      !(
        visitor.role === "SUPERUSER" ||
        post.authorId === visitor.id ||
        postAuthor.managerId === visitor.id
      )
    ) {
      res.status(401).send({
        success: false,
        message: "User is not authorized to perform this action",
      });
      return;
    }

    const deletePost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    res.status(200).send({ success: true, message: deletePost });
  } catch (error) {
    next(error);
  }
};

export default { create, allPosts, getPost, update, remove };
