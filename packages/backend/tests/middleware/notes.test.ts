import type { NoteDocument } from "../../src/data/models/note";
import type { INote } from "../../src/types/note";
import type { IUser } from "../../src/types/user";
import Chai from "chai";
import Supertest from "supertest";
import App from "../../src/app";
import { NoteModel } from "../../src/data/models/note";
import * as NoteData from "../../src/data/notes";
import * as UserData from "../../src/data/users";
import { UserModel } from "../../src/data/users";
import Database from "../../src/database";
import * as TokenHelper from "../../src/utils/token";
import * as Factory from "../factory";

const Expect = Chai.expect;
const Request = Supertest(App);

describe("note MiddleWare", () => {
  let sampleToken: string;

  before(async () => {
    await Database.connect();

    await UserModel.deleteMany({});
    const sampleUser = Factory.models.createUsers() as IUser;
    const user = await UserData.createUser(sampleUser.name, sampleUser.email, sampleUser.password);
    sampleToken = TokenHelper.getToken(user.id);
  });

  after(async () => {
    await Database.drop();
    await Database.disconnect();
  });

  describe("pOST - note", () => {
    const ENDPOINT = "/api/admin/notes";

    beforeEach(async () => {
      await NoteModel.deleteMany({});
    });

    it("should return note + 201", async () => {
      const sampleNote = Factory.models.createNote() as Partial<INote>;

      const response = await Request.post(ENDPOINT)
        .auth(sampleToken, { type: "bearer" })
        .send(sampleNote)
        .expect(201);

      Expect(response.body.title).to.equal(sampleNote.title);
      Expect(response.body.content).to.equal(sampleNote.content);
    });

    it("should return note with slug", async () => {
      const sampleNote = Factory.models.createNote();

      const response = await Request.post(ENDPOINT)
        .auth(sampleToken, { type: "bearer" })
        .send(sampleNote)
        .expect(201);

      Expect(response.body.slug).to.exist;
    });

    it("should throw 400 if note is invalid", async () => {
      const sampleNote = Factory.models.createNote();
      delete (sampleNote as any).title;

      await Request.post(ENDPOINT)
        .auth(sampleToken, { type: "bearer" })
        .send(sampleNote)
        .expect(400);
    });

    it("should throw 401 if token is invalid", async () => {
      const sampleNote = Factory.models.createNote();
      let invalidRequestToken = TokenHelper.getToken("invalid_id");

      await Request.post(ENDPOINT)
        .auth(invalidRequestToken, { type: "bearer" })
        .send(sampleNote)
        .expect(401);

      invalidRequestToken = "invalid_token";
      await Request.post(ENDPOINT)
        .auth(invalidRequestToken, { type: "bearer" })
        .send(sampleNote)
        .expect(401);

      // no token
      await Request.post(ENDPOINT)
        .send(sampleNote)
        .expect(401);
    });
  });

  describe("gET - note", () => {
    const MAX_PUBLIC_NOTES = 5;
    const MAX_PRIVATE_NOTES = 5;
    let privateSampleNotes: NoteDocument[];
    let publicSampleNotes: NoteDocument[];

    before(async () => {
      await NoteModel.deleteMany();

      const pubNotes = Factory.models.createNote({ num: MAX_PUBLIC_NOTES, publish: true, title: "public" }) as Partial<INote>[];
      const privNotes = Factory.models.createNote({ num: MAX_PRIVATE_NOTES, publish: false, title: "private" }) as Partial<INote>[];

      publicSampleNotes = await Promise.all(
        pubNotes.map(async (note) => {
          return await NoteData.postNote(
            note.title!,
            note.content!,
            note.tags!,
            note.publish!
          );
        }
        )
      );

      privateSampleNotes = await Promise.all(
        privNotes.map(async (note) => {
          return await NoteData.postNote(
            note.title!,
            note.content!,
            note.tags!,
            note.publish!
          );
        }
        )
      );
    });

    after(async () => {
      await NoteModel.deleteMany({});
    });

    it("should return a public note + 200", async () => {
      const sampleNote = publicSampleNotes[0];
      const response = await Request.get(`/api/notes/${sampleNote.id}`).expect(200);

      Expect(response.body.title).to.equal(sampleNote.title);
      Expect(response.body.content).to.equal(sampleNote.content);
    });

    it("(admin) should return a private note if valid token is provided + 200", async () => {
      const sampleNote = privateSampleNotes[0];
      const response = await Request.get(`/api/admin/notes/${sampleNote.id}`)
        .auth(sampleToken, { type: "bearer" })
        .expect(200);

      Expect(response.body.title).to.equal(sampleNote.title);
      Expect(response.body.content).to.equal(sampleNote.content);
    });

    it("should throw 404 if note is not found", async () => {
      const invalidId = Factory.mongo.createObjectId();
      await Request.get(`/api/notes/${invalidId}`).expect(404);
    });

    it("(admin) should throw 401 if token is invalid", async () => {
      const sampleNote = privateSampleNotes[0];
      let invalidRequestToken = TokenHelper.getToken("invalid_id");

      await Request.get(`/api/admin/notes/${sampleNote.id}`)
        .auth(invalidRequestToken, { type: "bearer" })
        .expect(401);

      invalidRequestToken = "invalid_token";
      await Request.get(`/api/admin/notes/${sampleNote.id}`)
        .auth(invalidRequestToken, { type: "bearer" })
        .expect(401);

      // no token
      await Request.get(`/api/admin/notes/${sampleNote.id}`)
        .expect(401);
    });
  });

  describe("gET - note via slug", () => {
    const MAX_PUBLIC_NOTES = 5;
    const MAX_PRIVATE_NOTES = 5;
    let privateSampleNotes: NoteDocument[];
    let publicSampleNotes: NoteDocument[];

    before(async () => {
      await NoteModel.deleteMany();

      const pubNotes = Factory.models.createNote({ num: MAX_PUBLIC_NOTES, publish: true, title: "public" }) as Partial<INote>[];
      const privNotes = Factory.models.createNote({ num: MAX_PRIVATE_NOTES, publish: false, title: "private" }) as Partial<INote>[];

      publicSampleNotes = await Promise.all(
        pubNotes.map(async (note) => {
          return await NoteData.postNote(
            note.title!,
            note.content!,
            note.tags!,
            note.publish!
          );
        }
        )
      );

      privateSampleNotes = await Promise.all(
        privNotes.map(async (note) => {
          return await NoteData.postNote(
            note.title!,
            note.content!,
            note.tags!,
            note.publish!
          );
        }
        )
      );
    });

    after(async () => {
      await NoteModel.deleteMany({});
    });

    it("should return a public note + 200", async () => {
      const sampleNote = publicSampleNotes[0];
      const response = await Request.get(`/api/notes/${sampleNote.slug}?slug=true`).expect(200);

      Expect(response.body.title).to.equal(sampleNote.title);
      Expect(response.body.content).to.equal(sampleNote.content);
    });

    it("(admin) should return a private note if valid token is provided + 200", async () => {
      const sampleNote = privateSampleNotes[0];
      const response = await Request.get(`/api/admin/notes/${sampleNote.slug}?slug=true`)
        .auth(sampleToken, { type: "bearer" })
        .expect(200);

      Expect(response.body.title).to.equal(sampleNote.title);
      Expect(response.body.content).to.equal(sampleNote.content);
    });

    it("should throw 404 if note is not found", async () => {
      const invalidSlug = "invalid-slug";
      await Request.get(`/api/notes/${invalidSlug}?slug=true`).expect(404);
    });

    it("(admin) should throw 401 if token is invalid", async () => {
      const sampleNote = privateSampleNotes[0];
      let invalidRequestToken = TokenHelper.getToken("invalid_id");

      await Request.get(`/api/admin/notes/${sampleNote.slug}?slug=true`)
        .auth(invalidRequestToken, { type: "bearer" })
        .expect(401);

      invalidRequestToken = "invalid_token";
      await Request.get(`/api/admin/notes/${sampleNote.slug}?slug=true`)
        .auth(invalidRequestToken, { type: "bearer" })
        .expect(401);

      // no token
      await Request.get(`/api/admin/notes/${sampleNote.slug}?slug=true`)
        .expect(401);
    });
  });

  describe("gET - notes", () => {
    const MAX_PUBLIC_NOTES = 5;
    const MAX_PRIVATE_NOTES = 5;

    before(async () => {
      await NoteModel.deleteMany({});

      const pubNotes = Factory.models.createNote({ num: MAX_PUBLIC_NOTES, publish: true, title: "public" }) as Partial<INote>[];
      const privNotes = Factory.models.createNote({ num: MAX_PRIVATE_NOTES, publish: false, title: "private" }) as Partial<INote>[];

      await Promise.all(
        [...pubNotes, ...privNotes].map(async (note) => {
          return await NoteData.postNote(
            note.title!,
            note.content!,
            note.tags!,
            note.publish!
          );
        }
        )
      );
    });

    after(async () => {
      await NoteModel.deleteMany({});
    });

    it("should return all public notes + 200", async () => {
      const response = await Request.get("/api/notes").expect(200);
      Expect(response.body.length).to.equal(MAX_PUBLIC_NOTES);
    });

    it("(admin) should return all notes if valid token is provided + 200", async () => {
      const response = await Request.get("/api/admin/notes")
        .auth(sampleToken, { type: "bearer" })
        .expect(200);

      Expect(response.body.length).to.equal(MAX_PUBLIC_NOTES + MAX_PRIVATE_NOTES);
    });
  });

  describe("gET - tags", () => {
    const MAX_NOTES = 5;
    const SAMPLE_TAGS = ["tag1", "tag2", "tag3"];

    before(async () => {
      await NoteModel.deleteMany({});

      const notes = Factory.models.createNote({ num: MAX_NOTES, title: "public", tags: SAMPLE_TAGS }) as Partial<INote>[];

      await Promise.all(
        [...notes].map(async (note) => {
          return await NoteData.postNote(
            note.title!,
            note.content!,
            note.tags!,
            note.publish!
          );
        }
        )
      );
    });

    after(async () => {
      await NoteModel.deleteMany({});
    });

    it("should return tags + 200", async () => {
      const response = await Request.get("/api/notes/tags").expect(200);

      Expect(response.body.length).to.equal(SAMPLE_TAGS.length);
    });
  });

  describe("pATCH - note", () => {
    let sampleNote: NoteDocument;

    before(async () => {
      await NoteModel.deleteMany({});

      const note = Factory.models.createNote() as INote;
      sampleNote = await NoteData.postNote(note.title, note.content, note.tags, note.publish);
    });

    it("should update note views and return 200", async () => {
      const response = await Request.patch(`/api/notes/${sampleNote.id}/views`)
        .expect(200);

      Expect(response.body.views).to.equal(sampleNote.views + 1);
    });

    it("(admin) should update a note and return 200", async () => {
      const patch = {
        title: "new title",
        content: "new content"
      };

      const response = await Request.patch(`/api/admin/notes/${sampleNote.id}`)
        .auth(sampleToken, { type: "bearer" })
        .send(patch)
        .expect(200);

      Expect(response.body.title).to.equal(patch.title);
      Expect(response.body.content).to.equal(patch.content);
    });

    it("(admin) should throw 404 if note is not found", async () => {
      const invalidId = Factory.mongo.createObjectId();
      const patch = {
        title: "new title",
        content: "new content"
      };

      await Request.patch(`/api/admin/notes/${invalidId}`)
        .auth(sampleToken, { type: "bearer" })
        .send(patch)
        .expect(404);
    });

    it("(admin) should throw 401 if token is invalid", async () => {
      const patch = {
        title: "new title",
        content: "new content"
      };

      const invalidRequestToken = TokenHelper.getToken("invalid_id");

      await Request.patch(`/api/admin/notes/${sampleNote.id}`)
        .auth(invalidRequestToken, { type: "bearer" })
        .send(patch)
        .expect(401);
    });
  });

  describe("dELETE - note", () => {
    let sampleNote: NoteDocument;
    before(async () => {
      await NoteModel.deleteMany({});

      const note = Factory.models.createNote() as INote;
      sampleNote = await NoteData.postNote(note.title, note.content, note.tags, note.publish);
    });

    it("(admin) should delete a note and return 203", async () => {
      const response = await Request.delete(`/api/admin/notes/${sampleNote.id}`)
        .auth(sampleToken, { type: "bearer" })
        .expect(203);

      Expect(response.body.title).to.equal(sampleNote.title);
      Expect(response.body.content).to.equal(sampleNote.content);
    });

    it("(admin) should throw 404 if note is not found", async () => {
      const invalidId = Factory.mongo.createObjectId();

      await Request.delete(`/api/admin/notes/${invalidId}`)
        .auth(sampleToken, { type: "bearer" })
        .expect(404);
    });

    it("(admin) should throw 401 if token is invalid", async () => {
      let invalidRequestToken = TokenHelper.getToken("invalid_id");

      await Request.delete(`/api/admin/notes/${sampleNote.id}`)
        .auth(invalidRequestToken, { type: "bearer" })
        .expect(401);

      invalidRequestToken = "invalid_token";
      await Request.delete(`/api/admin/notes/${sampleNote.id}`)
        .auth(invalidRequestToken, { type: "bearer" })
        .expect(401);

      // no token
      await Request.delete(`/api/admin/notes/${sampleNote.id}`)
        .expect(401);
    });
  });
});
