const registerSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 1 },
    lastName: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    // password: { type: "string", minLength: 6 },
    password: {
      type: "string",
      pattern:
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{6,20}$",
    },

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
    title: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
  },
  required: ["title", "description"],
  additionalProperties: false,
};

const commentSchema = {
  type: "object",
  properties: {
    description: { type: "string", minLength: 1 },
  },
  required: ["description"],
  additionalProperties: false,
};

export default { registerSchema, loginSchema, postSchema, commentSchema };
