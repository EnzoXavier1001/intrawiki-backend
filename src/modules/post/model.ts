import { model, Schema, Types } from "mongoose";

const postModel = new Schema(
	{
		title: { required: true, type: String },
		content: { required: true, type: String },
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
