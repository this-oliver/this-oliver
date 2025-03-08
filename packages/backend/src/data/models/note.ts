import type { INote } from "../../types/note";
import Mongoose from "mongoose";
import * as SlugHelper from "../../utils/slug";

const NoteSchema = new Mongoose.Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    publish: { type: Boolean, default: false },
    slug: { type: String, unique: true },
    views: { type: Number, default: 0 },
    tags: [{ type: String }]

  },
  { timestamps: true }
);

NoteSchema.pre("save", async function (next) {
  // Only generate a new slug if the article's title has changed.
  const titleChanged = this.isModified("title");
  if (titleChanged) {
    const _generateSlug = async (text: string): Promise<string> => {
      const slug: string = SlugHelper.createSlug(text);

      // search for slug in database
      const exists = await (this.constructor as unknown as Mongoose.Collection).findOne({ slug });

      if (exists) {
        const randomNumber = Math.random().toString(36).substring(2, 8);
        return _generateSlug(`${text}-${randomNumber}`);
      }

      return slug;
    };

    this.slug = await _generateSlug(this.title);
  }

  next();
});

const NoteModel = Mongoose.model("note", NoteSchema);

type NoteDocument = INote & Mongoose.Document;

export { NoteDocument, NoteModel };
