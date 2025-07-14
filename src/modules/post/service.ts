import type { Request, Response } from "express";
import { postSchema } from "./model";

export async function createPost(req: Request, res: Response) {
	try {
		const { title, content, status, tags } = req.body;

		const postExist = await postSchema.findOne({ title });

		if (postExist) {
			throw new Error("Post já existe no sistema");
		}

		const post = await postSchema.create({ title, content, status, tags });
		return res.status(200).json(post);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";

		return res.status(500).json({ status: "error", message });
	}
}

export async function getAllPosts(res: Response) {
	try {
		const posts = await postSchema.find();
		return res.status(200).json(posts);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";

		return res.status(500).json({ status: "error", message });
	}
}
