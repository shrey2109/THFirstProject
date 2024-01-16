

const registerSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    userEmail: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    contactNumber: { type: "string", minLength: 10, maxLength: 10 },
  },
  required: ["firstName", "lastName", "userEmail", "password", "contactNumber"],
  additionalProperties: false,
};

const loginSchema = {
  type: "object",
  properties: {
    userEmail: { type: "string" },
    password: { type: "string" },
  },
  required: ["userEmail", "password"],
  additionalProperties: false,
};

export default { registerSchema, loginSchema };
