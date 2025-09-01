import type { Request, Response } from "express";
import { announcementsSchema } from "./model";

export async function createAnnouncements(req: Request, res: Response) {
	try {
		const { title, type, author, eventDate } = req.body;

		const titleExist = await announcementsSchema.findOne({ title });

		if (titleExist) {
			throw new Error("O Evento já existe no sistema");
		}

		const announcements = await announcementsSchema.create({
			title,
			type,
			author,
			eventDate,
		});

		return res.status(200).json(announcements);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";

		return res.status(500).json({ status: "error", message });
	}
}

export async function getAllAnnouncements(res: Response) {
	try {
		const posts = await announcementsSchema.find();

		return res.status(200).json(posts);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";
		return res.status(500).json({ status: "error", message });
	}
}
