import express from "express";
import authRouter from "../routers/authRouter";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", authRouter);

app.use("/", async (req, res) => {
  res.status(404).send("PAGE NOT FOUND");
});

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON :", PORT);
});
