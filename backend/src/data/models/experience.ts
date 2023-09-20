import Mongoose from "mongoose";
import type { IExperience } from "../../types/experience";

const ExperienceSchema = new Mongoose.Schema<IExperience>({
	title: { type: String, required: true },
	org: { type: String },
	startYear: { type: Number, required: true },
	endYear: { type: Number },
	description: { type: String, required: true },
	type: { type: String, required: true },
	link: { type: String },
	image: { type: String },
}, { timestamps: true });

type ExperienceDocument = IExperience & Mongoose.Document;

const ExperienceModel = Mongoose.model("experience", ExperienceSchema);

export { ExperienceDocument, ExperienceModel };
