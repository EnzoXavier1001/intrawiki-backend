import type { Request, Response } from "express";
import { postSchema } from "./model";
import { Status } from "../../types/Status";

export async function createPost(req: Request, res: Response) {
	try {
		const { title, content, status, tags, author } = req.body;

		const postExist = await postSchema.findOne({ title });

		if (postExist) {
			throw new Error("Post já existe no sistema");
		}

		if (!Object.values(Status).includes(status)) {
			throw new Error("Status inválido");
		}

		const post = await postSchema.create({
			title,
			content,
			status,
			tags,
			author,
		});
		return res.status(200).json(post);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";

		return res.status(500).json({ status: "error", message });
	}
}

export async function getAllPosts(res: Response) {
	try {
		const posts = await postSchema.find({ status: { $ne: "draft" } });
		return res.status(200).json(posts);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";

		return res.status(500).json({ status: "error", message });
	}
}

export async function getPostById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const postExist = await postSchema.findById(id);

		if (!postExist) {
			throw new Error("Post não localizado no sistema");
		}

		const post = await postSchema.findByIdAndUpdate(id, {});

		return res.status(200).json(post);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";

		return res.status(500).json({ status: "error", message });
	}
}

export async function updatePostById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { title, content, status, tags } = req.body;

		const postExist = await postSchema.findById(id);

		if (!postExist) {
			throw new Error("Post não localizado no sistema");
		}

		if (!Object.values(Status).includes(status)) {
			throw new Error("Status inválido");
		}

		const post = await postSchema.findByIdAndUpdate(id, {
			title,
			content,
			status,
			tags,
		});

		return res.status(201).json(post);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";

		return res.status(500).json({ status: "error", message });
	}
}

export async function deletePostById(req: Request, res: Response) {
	try {
		const { id } = req.params;

		const postExist = await postSchema.findById(id);

		if (!postExist) {
			throw new Error("Post não localizado no sistema");
		}

		const post = await postSchema.findByIdAndUpdate(id, { status: "draft" });

		return res.status(201).json(post);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";

		return res.status(500).json({ status: "error", message });
	}
}
