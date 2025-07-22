import type { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { userSchema } from "./model";
import jwt from "jsonwebtoken";

export async function createUser(req: Request, res: Response) {
	try {
		const {
			email,
			name,
			password,
			hobbies,
			biography,
			linkedin,
			avatarUrl,
			skills,
			github,
			badge,
		} = req.body;

		const userExist = await userSchema.findOne({ email });

		if (userExist) {
			throw new Error("Ops! Este e-mail já está em uso.");
		}

		const hashedPassword = await hash(password, 10);

		const user = await userSchema.create({
			email,
			name,
			password: hashedPassword,
			hobbies,
			biography,
			linkedin,
			github,
			avatarUrl,
			skills,
			badge,
		});

		res.status(200).json(user);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";

		res.status(500).json({ status: "error", message });
	}
}

import type { Request, Response } from "express";
import { hash } from "bcrypt";
import { userSchema } from "./model";

export async function updateUser(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const {
			name,
			email,
			password,
			biography,
			linkedin,
			github,
			avatarUrl,
			skills,
			hobbies,
			badges, // badges que podem ser adicionadas
		} = req.body;

		const user = await userSchema.findById(id);
		if (!user) {
			return res.status(404).json({ message: "Usuário não encontrado." });
		}

		if (name) user.name = name;
		if (email) user.email = email;
		if (biography) user.biography = biography;
		if (linkedin) user.linkedin = linkedin;
		if (github) user.github = github;
		if (avatarUrl) user.avatarUrl = avatarUrl;
		if (skills) user.skills = skills;
		if (hobbies) user.hobbies = hobbies;

		if (badges && Array.isArray(badges)) {
			for (const badge of badges) {
				const alreadyExists = user.badges.some(
					(b) => b.badgeId === badge.badgeId,
				);
				if (!alreadyExists) {
					user.badges.push({
						badgeId: badge.badgeId,
						earnedAt: badge.earnedAt || new Date(),
					});
				}
			}
		}

		if (password) {
			const hashedPassword = await hash(password, 10);
			user.password = hashedPassword;
		}

		await user.save();

		res.status(200).json({ message: "Usuário atualizado com sucesso!", user });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Erro inesperado";
		res.status(500).json({ status: "error", message });
	}
}

export async function getAllUsers(res: Response) {
	try {
		const users = await userSchema.find();

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error fetching users." });
	}
}

export async function getUser(res: Response, id: string) {
	try {
		const user = await userSchema.findById(id);

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error fetching users." });
	}
}

export async function authUser(req: Request, res: Response) {
	try {
		const { email, password } = req.body;

		const userExist = await userSchema.findOne({ email });

		if (!userExist) {
			throw new Error("E-mail doesnt exist");
		}

		const passwordMatch = await compare(password, userExist.password);

		if (!passwordMatch) {
			throw new Error("Senha inválida");
		}

		const secret = process.env.SECRET!;

		const token = jwt.sign(
			{
				id: userExist._id,
			},
			secret,
			// { expiresIn: "4h" },
		);

		res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
	} catch (error) {
		res.status(500).json({ status: "error", message: "Error fetching users." });
	}
}
