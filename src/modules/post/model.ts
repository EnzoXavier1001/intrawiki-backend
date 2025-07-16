import { model, Schema, Types } from "mongoose";

const postModel = new Schema(
	{
		title: { required: true, type: String },
		content: { required: true, type: String },
		thumbnail: { type: String },
		category: {
			type: String,
			enum: [
				"PVI",
				"AEM Author",
				"AEM Target",
				"AEM Launch",
				"Design",
				"TI",
				"RH",
				"VTEX",
			],
			required: true,
		},
		status: {
			type: String,
			enum: ["draft", "published", "archived"],
			default: "draft",
		},
		tags: {
			type: [String],
			default: [],
		},
		author: {
			type: Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

export const postSchema = model("Post", postModel);
