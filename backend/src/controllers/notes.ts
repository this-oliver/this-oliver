import type { Request, Response } from "express";
import * as NoteData from "../data/note";
import * as ErrorHelper from "../helpers/error";

async function postNote (req: Request, res: Response) {
	try {
		const note = await NoteData.postNote(
			req.body.title,
			req.body.content,
			req.body.tags,
			req.body.publish
		);
		return res.status(201).send(note);
	} catch (error) {
    return ErrorHelper.packageResponseError(error, res);
	}
};

async function indexNotes (req: Request, res: Response) {
  const authenticated: boolean = (req as any).authenticated || false;
  
  try {
    const notes = authenticated
    ? await NoteData.indexNotes(true)
    : await NoteData.indexNotes();
		
    return res.status(200).send(notes);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
};

async function getNote (req: Request, res: Response) {
	const articleId = req.params.id;
	const isSlugId = req.query.slug === "true";
  const authenticated: boolean = (req as any).authenticated || false;

	try {
    let note;

    if(isSlugId) {
      note = authenticated
        ? await NoteData.getNoteBySlug(articleId, true)
        : await NoteData.getNoteBySlug(articleId);
    } else {
      note = authenticated
        ? await NoteData.getNote(articleId, true)
        : await NoteData.getNote(articleId);
    }

		return res.status(200).send(note);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
};

async function patchNote (req: Request, res: Response) {
	try {
		const note = await NoteData.updateNote(req.params.id, req.body);
		return res.status(200).send(note);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
};

async function deleteNote (req: Request, res: Response) {
	try {
		const note = await NoteData.deleteNote(req.params.id);
		return res.status(203).send(note);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
};

async function incrementNoteViews (req: Request, res: Response) {
	try {
		const note = await NoteData.incrementNoteViews(req.params.id);
		return res.status(200).send(note);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
};

// tags
async function indexNoteTags (req: Request, res: Response) {
	const authenticated: boolean = (req as any).authenticated || false;
  
  try {
		const tags = authenticated
      ? await NoteData.indexTags(true)
      : await NoteData.indexTags(false);

		return res.status(200).send(tags);
	} catch (error) {
		return ErrorHelper.packageResponseError(error, res);
	}
};

export {
  postNote,
  indexNotes,
  getNote,
  patchNote,
  deleteNote,
  incrementNoteViews,
  indexNoteTags
};