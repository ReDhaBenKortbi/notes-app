import NoteRepository from "../data/repositories/note.repository.js";
import {
  NoteAttributes,
  NoteCreationAttributes,
} from "../types/notesAttributes.js";

export class NoteService {
  private noteRepo;
  constructor(noteRepo: NoteRepository) {
    this.noteRepo = noteRepo;
  }

  async getAllNotes(id: number): Promise<NoteAttributes[]> {
    return this.noteRepo.getAllNotes(id);
  }

  async getNoteById(
    id: string,
    currUserId: string
  ): Promise<NoteAttributes | null> {
    return this.noteRepo.getNoteById(id, currUserId);
  }

  async createNote(noteData: NoteCreationAttributes): Promise<NoteAttributes> {
    if (!noteData.title.length || !noteData.text.length) {
      throw new Error("Title or Text is short");
    }
    return this.noteRepo.createNote(noteData);
  }

  async markAsCompleted(
    id: string,
    userId: string
  ): Promise<[affectedCount: number]> {
    const note = await this.noteRepo.getNoteById(id, userId);
    if (note === null) {
      throw new Error("invalid resource");
    }
    return this.noteRepo.markNoteAsCompleted(id, userId);
  }

  async updateNote(
    id: string,
    userId: string,
    updateData: Pick<NoteAttributes, "title" | "text">
  ) {
    const note = await this.noteRepo.getNoteById(id, userId);
    if (note === null) {
      throw new Error("invalid resource");
    }

    if (note.title === updateData.title && note.text === updateData.text) {
      throw new Error("No change was done");
    }
    return this.noteRepo.updateNote(id, userId, updateData);
  }

  async deleteNote(id: string, currUserId: string): Promise<number> {
    const note = await this.noteRepo.getNoteById(id, currUserId);
    if (note === null) {
      throw new Error("invalid resource");
    }
    return this.noteRepo.deleteNote(id);
  }
}
