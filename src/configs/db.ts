import mongoose from "mongoose";

export async function connectToDatabase() {
	try {
		await mongoose.connect(process.env.DATABASE_URL!);
		console.log("🟢 Banco de dados conectado");
	} catch (err) {
		console.error("🔴 Erro ao conectar ao banco:", err);
		process.exit(1);
	}
}
