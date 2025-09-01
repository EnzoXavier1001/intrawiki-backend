import type { Request, Response } from "express";
import { createAnnouncements, getAllAnnouncements } from "./service";

export class announcementsController {
	async show(req: Request, res: Response) {
		await getAllAnnouncements(res);
	}

	async create(req: Request, res: Response) {
		await createAnnouncements(req, res);
	}
}
