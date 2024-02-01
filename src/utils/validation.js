import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true });
import ajvErrors from "ajv-errors";
ajvErrors(ajv);

import ajvSchema from "./ajvSchema.js";
import addFormats from "ajv-formats";
addFormats(ajv);

const fetchErrors = (errors) => {
  const errArr = errors.map((e) => {
    return e.message;
  });
  return errArr.join(" | ");
};

const registerValidate = (data) => {
  const validate = ajv.compile(ajvSchema.registerSchema);
  const valid = validate(data);
  if (!valid)
    return {
      success: false,
      message: fetchErrors(validate.errors),
    };
  return {
    success: true,
    message: "All OK",
  };
};

const loginValidate = (data) => {
  const validate = ajv.compile(ajvSchema.loginSchema);
  const valid = validate(data);
  if (!valid)
    return {
      success: false,
      message: fetchErrors(validate.errors),
    };

  return {
    success: true,
    message: "All OK",
  };
};

const postValidate = (data) => {
  const validate = ajv.compile(ajvSchema.postSchema);
  const valid = validate(data);
  if (!valid)
    return {
      success: false,
      message: fetchErrors(validate.errors),
    };

  return {
    success: true,
    message: "All OK",
  };
};

const commentValidate = (data) => {
  const validate = ajv.compile(ajvSchema.commentSchema);
  const valid = validate(data);
  if (!valid)
    return {
      success: false,
      message: fetchErrors(validate.errors),
    };

  return {
    success: true,
    message: "All OK",
  };
};

export default {
  registerValidate,
  loginValidate,
  postValidate,
  commentValidate,
};
