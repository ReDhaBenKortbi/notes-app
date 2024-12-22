import { ModelStatic } from "sequelize";
import {
  NoteAttributes,
  NoteCreationAttributes,
  NoteInstance,
} from "../../types/notesAttributes";

class NoteRepository {
  private noteModel;

  constructor(noteModel: ModelStatic<NoteInstance>) {
    this.noteModel = noteModel;
  }

  async getAllNotes(): Promise<NoteAttributes[]> {
    return this.noteModel.findAll();
  }

  async getNoteById(id: string): Promise<NoteAttributes | null> {
    return this.noteModel.findByPk(parseInt(id));
  }

  async createNote(noteData: NoteCreationAttributes): Promise<NoteAttributes> {
    return this.noteModel.create(noteData);
  }

  async markNoteAsCompleted(id: string): Promise<[affectedCount: number]> {
    return await this.noteModel.update(
      { isCompleted: true },
      {
        where: {
          id,
        },
      }
    );
  }

  async deleteNote(id: string): Promise<number> {
    return this.noteModel.destroy({
      where: {
        id,
      },
    });
  }
}

export default NoteRepository;
