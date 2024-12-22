import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { NoteService } from "../application/note.service";

class NoteController {
  private noteService;
  constructor(noteService: NoteService) {
    this.noteService = noteService;
  }

  getAllNotes = asyncHandler(async (req: Request, res: Response) => {
    const notes = await this.noteService.getAllNotes();
    res.status(200).json({ notes });
  });

  createNote = asyncHandler(async (req: Request, res: Response) => {
    const noteData = req.body;
    const newNote = await this.noteService.createNote(noteData);
    res.status(201).json({
      message: "new note created successfully",
      new_note: newNote,
    });
  });

  markNoteAsCompleted = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const [affectedCounts] = await this.noteService.markAsCompleted(id);
    if (affectedCounts === 0) {
      res.status(400).json({
        message: "no resource has updated",
      });
    }
    res.status(200).json({
      message: "note has been marked as completed",
    });
  });

  deleteNote = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedRows = await this.noteService.deleteNote(id);
    if (deletedRows === 0) {
      res.status(400).json({
        message: "no resource has deleted",
      });
    }
    res.status(200).json({
      message: "note was deleted successfully",
    });
  });
}

export default NoteController;
