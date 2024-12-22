import { Router } from "express";
import NoteController from "../presentation/note.controller";
import { verifyJwt } from "../middleware/verifyJwt";

class NoteRouter {
  public router: Router;

  constructor(private noteController: NoteController) {
    this.router = Router();
    this.router.use(verifyJwt);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/all-notes", this.noteController.getAllNotes);
    this.router.post("/create-note", this.noteController.createNote);
    this.router.put(
      "/mark-completed/:id",
      this.noteController.markNoteAsCompleted
    );
    this.router.delete("/delete-note/:id", this.noteController.deleteNote);
  }
}

export default NoteRouter;
