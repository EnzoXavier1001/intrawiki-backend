import { Router } from "express";
import { userController } from "./controller";
import { authenticateUser } from "../../middlewares/authenticate";

const UserController = new userController();

const router = Router();

router.post("/", (req, res) => UserController.create(req, res));
router.post("/auth", (req, res) => UserController.auth(req, res));
router.get("/", authenticateUser, (req, res) => UserController.show(res));
router.put("/:id", (req, res) => UserController.update(req, res));
router.get("/:id", authenticateUser, (req, res) =>
	UserController.get(req, res),
);

export { router as userRoutes };
