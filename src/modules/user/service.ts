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
		});

		res.status(200).json(user);
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
