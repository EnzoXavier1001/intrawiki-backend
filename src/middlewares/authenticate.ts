import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export function authenticateUser(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.headers["authorization"];

	const secret = process.env.SECRET!;
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ msg: "Acesso negado" });
	}

	jwt.verify(token, secret);

	next();
}
