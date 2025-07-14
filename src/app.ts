import express from "express";
import cors from "cors";
import { userRoutes } from "./modules/user";
import { postRoutes } from "./modules/post";

import { config } from "dotenv";

const app = express();
config();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

export { app };
