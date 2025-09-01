import { model, Schema, Types } from "mongoose";

const announcementsModel = new Schema(
	{
		title: { required: true, type: String },
		type: {
			type: String,
			enum: ["presencial", "remoto"],
			required: false,
		},
		eventDate: { type: Date, required: true },
		author: {
			type: Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

export const announcementsSchema = model("Announcements", announcementsModel);
