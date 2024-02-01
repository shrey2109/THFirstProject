import prisma from "../utils/prismaClient.js";

const findUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};

const findPost = async (postId) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  return post;
};

const findComment = async (commentId) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  return comment;
};

export default { findUser, findPost, findComment };
