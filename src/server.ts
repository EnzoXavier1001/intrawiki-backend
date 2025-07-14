import { app } from "./app";
import { connectToDatabase } from "./configs/db";

const PORT = process.env.PORT || 6000;

async function serverInit() {
	try {
		await connectToDatabase();
		app.listen(PORT, () => {
			console.log(`Servidor rodando em http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Erro ao conectar no servidor", error);
		process.exit(1);
	}
}

serverInit();
