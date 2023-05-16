import Mongoose from "mongoose";
import * as SlugHelper from "../../utils/slug";
import type { INote } from "../../types/note";

const NoteSchema = new Mongoose.Schema<INote>(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		publish: { type: Boolean, default: false },
		slug: { type: String, unique: true },
		views: { type: Number, default: 0 },
    tags: [{ type: String }],
    
	},
	{ timestamps: true }
);

NoteSchema.pre('save', async function(next) {
	// Only generate a new slug if the article's title has changed.
  const titleChanged = this.isModified("title");
  if(titleChanged) {
    const context = this;

    async function _generateSlug(text: string): Promise<string> {
      const slug: string = SlugHelper.createSlug(text);

      // search for slug in database
      const exists = await (context.constructor as any).findOne({ slug });

      if(exists) {
        const randomNumber = Math.random().toString(36).substring(2, 8);
        return _generateSlug(`${text}-${randomNumber}`);
      }

      return slug;
    }

    this.slug = await _generateSlug(this.title);
  }
  
  next();
});

type NoteDocument = INote & Mongoose.Document;

const NoteModel = Mongoose.model("article", NoteSchema);

export { NoteModel, NoteDocument };
