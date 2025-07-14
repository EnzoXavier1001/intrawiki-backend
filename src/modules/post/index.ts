import { Router } from "express";
import { postController } from "./controller";
import { authenticateUser } from "../../middlewares/authenticate";

const UserController = new postController();

const router = Router();

router.get("/", (req, res) => UserController.show(req, res));
router.post("/", (req, res) => UserController.create(req, res));

export { router as postRoutes };
