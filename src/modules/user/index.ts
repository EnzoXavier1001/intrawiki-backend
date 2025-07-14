import { Router } from "express";
import { userController } from "./controller";
import { authenticateUser } from "../../middlewares/authenticate";

const UserController = new userController();

const router = Router();

router.post("/users", (req, res) => UserController.create(req, res));
router.post("/users/auth", (req, res) => UserController.auth(req, res));
router.get("/users", authenticateUser, (req, res) => UserController.show(res));
router.get("/users/:id", authenticateUser, (req, res) =>
	UserController.get(req, res),
);

export { router as userRoutes };
