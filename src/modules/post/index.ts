import { Router } from "express";
import { postController } from "./controller";
import { authenticateUser } from "../../middlewares/authenticate";

const UserController = new postController();

const router = Router();

router.get("/", authenticateUser, (req, res) => UserController.show(req, res));
router.get("/search", (req, res) => UserController.searchPostsByUser(req, res));
router.get("/:id", authenticateUser, (req, res) =>
	UserController.get(req, res),
);
router.post("/", authenticateUser, (req, res) =>
	UserController.create(req, res),
);
router.put("/:id", authenticateUser, (req, res) =>
	UserController.update(req, res),
);
router.put("/delete/:id", authenticateUser, (req, res) =>
	UserController.delete(req, res),
);

export { router as postRoutes };
