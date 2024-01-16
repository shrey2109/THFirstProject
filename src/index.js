import express from "express";
import authRouter from "./routers/authRouter.js";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON :", PORT);
});
