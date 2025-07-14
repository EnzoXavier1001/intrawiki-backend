import express from "express";
import cors from "cors";
import { userRoutes } from "./modules/user";
import { config } from "dotenv";

const app = express();
config();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

export { app };
