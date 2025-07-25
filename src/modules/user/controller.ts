import {
	createUser,
	getAllUsers,
	getUser,
	authUser,
	updateUser,
} from "./service";
import type { Request, Response } from "express";

class userController {
	async create(req: Request, res: Response) {
		await createUser(req, res);
	}

	async show(res: Response) {
		await getAllUsers(res);
	}

	async get(req: Request, res: Response) {
		const { id } = req.params;
		await getUser(res, id);
	}

	async auth(req: Request, res: Response) {
		await authUser(req, res);
	}

	async update(req: Request, res: Response) {
		await updateUser(req, res);
	}
}

export { userController };
