import NoteRepository from "../data/repositories/note.repository";
import {
  NoteAttributes,
  NoteCreationAttributes,
} from "../types/notesAttributes";

export class NoteService {
  private noteRepo;
  constructor(noteRepo: NoteRepository) {
    this.noteRepo = noteRepo;
  }

  async getAllNotes(): Promise<NoteAttributes[]> {
    return this.noteRepo.getAllNotes();
  }

  async createNote(noteData: NoteCreationAttributes): Promise<NoteAttributes> {
    if (!noteData.title.length || !noteData.text.length) {
      throw new Error("Title or Text is short");
    }
    return this.noteRepo.createNote(noteData);
  }

  async markAsCompleted(id: string): Promise<[affectedCount: number]> {
    const note = await this.noteRepo.getNoteById(id);
    if (note === null) {
      throw new Error("invalid resource");
    }
    return this.noteRepo.markNoteAsCompleted(id);
  }

  async deleteNote(id: string): Promise<number> {
    const note = await this.noteRepo.getNoteById(id);
    if (note === null) {
      throw new Error("invalid resource");
    }
    return this.noteRepo.deleteNote(id);
  }
}
