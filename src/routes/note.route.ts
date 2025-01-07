import { Router } from "express";
import NoteController from "../presentation/note.controller.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

class NoteRouter {
  public router: Router;

  constructor(private noteController: NoteController) {
    this.router = Router();
    this.router.use(verifyJwt);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/all-notes", this.noteController.getAllNotes);
    this.router.get("/:id", this.noteController.getNoteById);
    this.router.post("/create-note", this.noteController.createNote);
    this.router.post(
      "/mark-completed/:id",
      this.noteController.markNoteAsCompleted
    );
    this.router.post("/update-note/:id", this.noteController.updateNote);
    this.router.post("/delete-note/:id", this.noteController.deleteNote);
  }
}

export default NoteRouter;
