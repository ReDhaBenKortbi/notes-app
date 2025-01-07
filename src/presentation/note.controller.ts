import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { NoteService } from "../application/note.service.js";
import { NoteAttributes } from "../types/notesAttributes.js";

class NoteController {
  private noteService;
  constructor(noteService: NoteService) {
    this.noteService = noteService;
  }

  getAllNotes = asyncHandler(async (req: Request, res: Response) => {
    //@ts-ignore
    const currentId = req.user.id;
    const notes = await this.noteService.getAllNotes(currentId);
    res.status(200).json({ notes });
  });

  getNoteById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    //@ts-ignore
    const currUserId = req.user.id;
    const note = await this.noteService.getNoteById(id, currUserId);
    if (note === null) {
      res.status(404).json({
        message: "Invalid resource",
      });
      return;
    }
    res.status(200).json({
      note,
    });
  });

  createNote = asyncHandler(async (req: Request, res: Response) => {
    const noteData = req.body;
    //@ts-ignore
    noteData.userId = req.user.id;
    const newNote = await this.noteService.createNote(noteData);
    res.status(201).json({
      message: "new note created successfully",
      new_note: newNote,
    });
  });

  markNoteAsCompleted = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    //@ts-ignore
    const userId = req.user.id;
    await this.noteService.markAsCompleted(id, userId);
    res.status(200).json({ message: "note has been updated" });
  });

  updateNote = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body as Pick<NoteAttributes, "title" | "text">;
    // @ts-ignore
    const userId = req.user.id;

    const [affectedCount] = await this.noteService.updateNote(
      id,
      userId,
      updateData
    );
    if (affectedCount === 0) {
      res.status(400).json({
        message: "no resource has updated",
      });
    }
    res.status(200).json({
      message: "note was updated successfully",
    });
  });

  deleteNote = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    //@ts-ignore
    const currUserId = req.user.id;
    const deletedRows = await this.noteService.deleteNote(id, currUserId);
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
