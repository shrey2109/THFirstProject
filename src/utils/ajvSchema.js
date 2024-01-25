const registerSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    contactNumber: { type: "string", minLength: 10, maxLength: 10 },
  },
  required: ["firstName", "lastName", "email", "password", "contactNumber"],
  additionalProperties: false,
};

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const postSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    // author: { type: "User" },
    // authorId: { type: "Int" },
  },
  required: ["title", "description"],
  additionalProperties: false,
};

const commentSchema = {
  type: "object",
  properties: {
    description: { type: "string" },
    // author: { type: "User" },
    // authorId: { type: "Int" },
    // post: { type: "Post" },
    // postId: { type: "Int" },
  },
  required: ["description"],
  additionalProperties: false,
};

export default { registerSchema, loginSchema, postSchema, commentSchema };
