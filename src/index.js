import express from "express";
import authRouter from "./routers/authRouter.js";
import postRouter from "./routers/postRouter.js";
import commentRouter from "./routers/commentRouter.js";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON :", PORT);
});
