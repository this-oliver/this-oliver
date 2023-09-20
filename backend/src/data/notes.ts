import Mongoose from "mongoose";
import { NoteModel, NoteDocument } from "./models/note";
import type { INote } from "../types/note";
import type { BaseError } from "../types/error";
import * as SlugHelper from "../utils/slug";

async function postNote (title: string, content: string, tags: string[], publish: boolean): Promise<NoteDocument> {
	// process tags
	tags = _processTags(tags);

	// create note
	try {
		return await NoteModel.create(
			new NoteModel({
				title: title,
				content: content,
				tags: tags,
				publish: publish,
			})
		);
	} catch (error) {

		if(error instanceof Mongoose.Error.ValidationError) {
			throw { message: error.message, status: 400 } as BaseError;
		}

		throw { message: (error as Error).message || error || 'Failed to create note', status: 500 } as BaseError;
	}
}

async function indexNotes (showSecrets?: boolean): Promise<NoteDocument[]> {
	const notes = showSecrets 
		? await NoteModel.find() 
		: await NoteModel.find({ publish: true });

	// add slugs to articles that don't have them
	return await Promise.all(
		notes.map(async (note) => {
			if(!note.slug) {
				const slug = SlugHelper.createSlug(note.title);
				await NoteModel.updateOne({ _id: note._id }, { slug }).exec();
				return await getNote(note.id, showSecrets);
			} else {
				return note;
			}
        
		})
	);
}

async function getNote (id: string, showSecrets?: boolean): Promise<NoteDocument> {
	const query = showSecrets ? { _id: id } : { _id: id, publish: true };
	const note = await NoteModel.findOne(query).populate("tags");

	if(!note) {
		throw { message: `note with id ${id} does not exist`, status: 404 } as BaseError;
	}
  
	return note;
}

async function getNoteBySlug (slug: string, showSecrets?: boolean): Promise<NoteDocument> {
	const query = showSecrets ? { slug: slug } : { slug: slug, publish: true };
	const note = await NoteModel.findOne(query).populate("tags");

	if(!note) {
		throw { message: `note with slug ${slug} does not exist`, status: 404 } as BaseError;
	}
  
	return note;
}

async function updateNote (id: string, patch: Partial<INote>): Promise<NoteDocument> {
	const note: NoteDocument = await getNote(id, true);

	note.slug = patch.slug || note.slug;

	if(patch.title !== undefined) note.title = patch.title;
	if(patch.content !== undefined) note.content = patch.content;
	if(patch.publish !== undefined && patch.publish !== null) note.publish = patch.publish;
	if(patch.tags !== undefined) note.tags = _processTags(patch.tags);

	try {
		return await note.save();
	} catch (error) {
		if(error instanceof Mongoose.Error.ValidationError) {
			throw { message: error.message, status: 400 } as BaseError;
		}

		throw { message: (error as Error).message || error || 'Failed to update note', status: 500 } as BaseError;
	}
}

async function deleteNote (id: string): Promise<NoteDocument> {
	const note: NoteDocument = await getNote(id, true);
  
	try {
		await note.deleteOne();
		return note;
	} catch (error) {
		throw { message: (error as Error).message || error || 'Failed to delete note', status: 500 } as BaseError;
	}
}

async function incrementNoteViews (id: string): Promise<NoteDocument> {
	const note: NoteDocument = await getNote(id, true);

	note.views = note.views + 1;
  
	try {
		return await note.save();
	} catch (error) {
		if(error instanceof Mongoose.Error.ValidationError) {
			throw { message: error.message, status: 400 } as BaseError;
		}

		throw { message: (error as Error).message || error || 'Failed to update note', status: 500 } as BaseError;
	}
}

async function indexTags(showSecrets?: boolean): Promise<string[]> {
	const query = showSecrets ? {} : { publish: true };
	return NoteModel.find(query).distinct("tags");
}

function _processTags(tags: any[]): string[] {
	return tags.map((tag) => {
		let name: string;
    
		if (typeof tag === "string") {
			name = tag;
		} else {
			name = tag.name;
		}

		return name.toLowerCase();
	}).flat();

}

export {
	postNote,
	indexNotes,
	getNote,
	getNoteBySlug,
	updateNote,
	deleteNote,
	incrementNoteViews,
	indexTags
};
