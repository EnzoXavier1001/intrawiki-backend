import type { Request, Response } from "express";
import { postSchema } from "./model";
import { Status } from "../../types/Status";
import { Category } from "../../types/Category";

export async function createPost(req: Request, res: Response) {
	try {
		const { title, content, status, tags, author, thumbnail, category } =
			req.body;

		const postExist = await postSchema.findOne({ title });

		if (postExist) {
			throw new Error("Post já existe no sistema");
		}

		console.log(category);

		if (
			!Object.values(Status).includes(status) ||
			!Object.values(Category).includes(category)
		) {
			throw new Error("Categoria ou status inválido");
		}

		const post = await postSchema.create({
			title,
			content,
			status,
			tags,
			author,
			thumbnail,
			category,
		});
		return res.status(200).json(post);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";

		return res.status(500).json({ status: "error", message });
	}
}

export async function getAllPosts(res: Response) {
	try {
		const posts = await postSchema
			.find()
			.sort({ createdAt: -1 })
			.populate("author", "name email avatarUrl _id");

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

		const post = await postSchema
			.findById(id)
			.populate("author", "name email avatarUrl _id");

		return res.status(200).json(post);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";

		return res.status(500).json({ status: "error", message });
	}
}

export async function updatePostById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const { title, content, status, tags, thumbnail, category } = req.body;

		const postExist = await postSchema.findById(id);

		if (!postExist) {
			throw new Error("Post não localizado no sistema");
		}

		const post = await postSchema.findByIdAndUpdate(id, {
			title,
			content,
			status,
			tags,
			thumbnail,
			category,
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

export async function searchPosts(req: Request, res: Response) {
	try {
		const { category, title } = req.query;

		const filters: any = {};

		if (category) {
			filters.category = category;
		}

		if (title) {
			filters.title = { $regex: title, $options: "i" };
		}

		const posts = await postSchema.find(filters);

		return res.status(200).json(posts);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";
		return res.status(500).json({ status: "error", message });
	}
}

export async function searchPostsByUserId(req: Request, res: Response) {
	try {
		const { id } = req.query;

		if (!id) {
			return res
				.status(400)
				.json({ status: "error", message: "ID do usuário não fornecido" });
		}

		const posts = await postSchema.find({ author: id }).populate("author");

		if (!posts || posts.length === 0) {
			return res.status(404).json({
				status: "error",
				message: "Nenhum post encontrado para esse usuário",
			});
		}

		return res.status(200).json(posts);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";
		return res.status(500).json({ status: "error", message });
	}
}
