import { Router } from "express";
import { announcementsController } from "./controller";
import { authenticateUser } from "../../middlewares/authenticate";

const AnnouncementsController = new announcementsController();

const router = Router();

router.get("/", (req, res) => AnnouncementsController.show(req, res));
router.post("/", (req, res) => AnnouncementsController.create(req, res));

export { router as announcementsRoutes };
