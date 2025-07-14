import { model, Schema } from "mongoose";

const allowedHobbies = [
	"Leitura",
	"Caminhada",
	"Fotografia",
	"Música",
	"Cinema",
	"Jardinagem",
	"Culinária",
	"Viagens",
	"Esportes",
	"Meditação",
	"Dança",
	"Pintura",
	"Jogos",
	"Colecionar",
	"Astronomia",
	"Academia",
	"Yoga",
	"Correr",
	"Natação",
	"Ciclismo",
	"Pesca",
	"Viajar",
];

const userModel = new Schema({
	email: { required: true, type: String },
	name: { required: true, type: String },
	password: { required: true, type: String },
	biography: { type: String },
	avatarUrl: { type: String },
	linkedin: { type: String },
	hobbies: [
		{
			type: String,
			enum: allowedHobbies,
		},
	],
});

export const userSchema = model("User", userModel);
