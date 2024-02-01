const registerSchema = {
  type: "object",
  required: ["firstName", "lastName", "email", "password", "contactNumber"],
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "firstName must be a string",
        minLength: "firstName's length must be greater than 1",
      },
    },
    lastName: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "lastName must be a string",
        minLength: "lastName's length must be greater than 1",
      },
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        type: "email must be a string",
        format: "incorrect email format",
      },
    },
    password: {
      type: "string",
      pattern:
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{6,20}$",
      errorMessage: {
        type: "password must be a string",
        pattern:
          "Password must contain at least 1 upper case letter, 1 lower case letter, 1 digit and 1 special character with minimum length of 6 and maximum length of 20",
      },
    },
    contactNumber: {
      type: "string",
      minLength: 10,
      maxLength: 10,
      errorMessage: {
        type: "contact number must be a string",
        minLength: "contact number's length must be 10",
        maxLength: "contact number's length must be 10",
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: {
      firstName: "firstName field is missing",
      lastName: "lastName field is missing",
      email: "email field is missing",
      password: "password field is missing",
      contactNumber: "contact number field is missing",
    },
  },
};

const loginSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "email must be a string",
        minLength: "email's length must be greater than 1",
      },
    },
    password: {
      type: "string",
      errorMessage: {
        type: "password must be a string",
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: {
      email: "email field is missing",
      password: "password field is missing",
    },
  },
};

const postSchema = {
  type: "object",
  required: ["title", "description"],
  properties: {
    title: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "title must be a string",
        minLength: "title's length must be greater than 1",
      },
    },
    description: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "description must be a string",
        minLength: "description's length must be greater than 1",
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: {
      title: "title field is missing",
      description: "description field is missing",
    },
  },
};

const commentSchema = {
  type: "object",
  required: ["description"],
  properties: {
    description: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "description must be a string",
        minLength: "description's length must be greater than 1",
      },
    },
  },
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: {
      description: "description field is missing",
    },
  },
};

export default { registerSchema, loginSchema, postSchema, commentSchema };
