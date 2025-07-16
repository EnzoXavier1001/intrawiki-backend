import type { Request, Response } from "express";
import {
	createPost,
	deletePostById,
	getAllPosts,
	getPostById,
	updatePostById,
} from "./service";

export class postController {
	async show(req: Request, res: Response) {
		await getAllPosts(res);
	}

	async create(req: Request, res: Response) {
		await createPost(req, res);
	}

	async get(req: Request, res: Response) {
		await getPostById(req, res);
	}

	async update(req: Request, res: Response) {
		await updatePostById(req, res);
	}

	async delete(req: Request, res: Response) {
		await deletePostById(req, res);
	}
}
