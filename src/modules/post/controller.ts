import type { Request, Response } from "express";
import { createPost, getAllPosts } from "./service";

export class postController {
	async show(req: Request, res: Response) {
		await getAllPosts(res);
	}

	async create(req: Request, res: Response) {
		await createPost(req, res);
	}
}
