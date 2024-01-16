import Ajv from "ajv";
import ajvSchema from "./ajvSchema.js";
const ajv = new Ajv();
import addFormats from "ajv-formats";
addFormats(ajv);

const registerValidate = (data) => {
  const validate = ajv.compile(ajvSchema.registerSchema);
  const valid = validate(data);
  if (!valid)
    return {
      success: false,
      message: validate.errors,
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
      message: validate.errors,
    };

  return {
    success: true,
    message: "All OK",
  };
};

export default { registerValidate, loginValidate };
