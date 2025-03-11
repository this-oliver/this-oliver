// prettier-ignore

import { Router } from "express";
import * as AuthController from "./middlewares/auth";
import * as ExperienceController from "./middlewares/experiences";
import * as NoteController from "./middlewares/notes";
import * as UserController from "./middlewares/users";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).send("Welcome to oliverrr's api");
});

router.get("/api", (req, res) => {
  return res.status(200).send("root");
});

interface Route {
  method: "get" | "post" | "patch" | "delete"
  path: string
  handler: any
  protected?: boolean
}

const routes: Route[] = [
  {
    path: "/api/users/oliver",
    method: "get",
    handler: UserController.getUser
  },
  {
    path: "/api/notes/tags",
    method: "get",
    handler: NoteController.indexNoteTags
  },
  {
    path: "/api/notes/:id/views",
    method: "patch",
    handler: NoteController.incrementNoteViews
  },
  {
    path: "/api/notes/:id",
    method: "get",
    handler: NoteController.getNote
  },
  {
    path: "/api/notes",
    method: "get",
    handler: NoteController.indexNotes
  },
  {
    path: "/api/experiences/:id",
    method: "get",
    handler: ExperienceController.getExperience
  },
  {
    path: "/api/experiences",
    method: "get",
    handler: ExperienceController.indexExperiences
  },

  // administrative
  {
    path: "/api/auth/login",
    method: "post",
    handler: AuthController.login
  },
  {
    path: "/api/admin/users",
    method: "post",
    handler: UserController.postUser
  },
  {
    path: "/api/admin/users",
    method: "patch",
    handler: UserController.patchUser,
    protected: true
  },
  {
    path: "/api/admin/users/passkey",
    method: "patch",
    handler: UserController.patchUserPasskey,
    protected: true
  },
  {
    path: "/api/admin/notes",
    method: "post",
    handler: NoteController.postNote,
    protected: true
  },
  {
    path: "/api/admin/notes/tags",
    method: "get",
    handler: NoteController.indexNoteTags,
    protected: true
  },
  {
    path: "/api/admin/notes/:id",
    method: "get",
    handler: NoteController.getNote,
    protected: true
  },
  {
    path: "/api/admin/notes",
    method: "get",
    handler: NoteController.indexNotes,
    protected: true
  },
  {
    path: "/api/admin/notes/:id",
    method: "patch",
    handler: NoteController.patchNote,
    protected: true
  },
  {
    path: "/api/admin/notes/:id",
    method: "delete",
    handler: NoteController.deleteNote,
    protected: true
  },
  {
    path: "/api/admin/experiences",
    method: "post",
    handler: ExperienceController.postExperience,
    protected: true
  },
  {
    path: "/api/admin/experiences/:id",
    method: "patch",
    handler: ExperienceController.patchExperience,
    protected: true
  },
  {
    path: "/api/admin/experiences/:id",
    method: "delete",
    handler: ExperienceController.deleteExperience,
    protected: true
  }
];

routes.forEach((route) => {
  if (route.protected) {
    router[route.method](route.path, AuthController.authenticate, route.handler);
  } else {
    router[route.method](route.path, route.handler);
  }
});

router.get("/*", (req, res) => {
  return res.status(400).send(`[*] the resource '${req.url}' does not exists`);
});

export default router;
