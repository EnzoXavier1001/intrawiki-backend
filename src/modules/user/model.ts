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

const userModel = new Schema(
	{
		email: { required: true, type: String },
		name: { required: true, type: String },
		password: { required: true, type: String },
		biography: { required: true, type: String },
		avatarUrl: { type: String },
		linkedin: { type: String },
		github: { type: String },
		skills: [{ type: String }],
		badges: [
			{
				badgeId: { type: String, required: true },
				earnedAt: { type: Date, default: Date.now },
			},
		],
		hobbies: [
			{
				type: String,
				enum: allowedHobbies,
			},
		],
	},
	{ timestamps: true },
);

export const userSchema = model("User", userModel);
