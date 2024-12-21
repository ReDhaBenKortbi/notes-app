import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

class NoteController {
  private noteRepo;
  constructor(noteRepo: any) {
    this.noteRepo = noteRepo;
  }

  getAllNotes = asyncHandler(async (req: Request, res: Response) => {
    const notes = await this.noteRepo.getAllNotes();
    res.status(200).json({ notes });
  });

  createNote = asyncHandler(async (req: Request, res: Response) => {
    const noteData = req.body;
    const newNote = await this.noteRepo.createNote(noteData);
    res.status(201).json({
      message: "new note created successfully",
      new_note: newNote,
    });
  });

  markNoteAsCompleted = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.noteRepo.markNoteAsCompleted(id);
    res.status(200).json({
      message: "note has been marked as completed",
    });
  });

  deleteNote = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.noteRepo.deleteNote(id);
    res.status(200).json({
      message: "note was deleted successfully",
    });
  });
}

export default NoteController;
