import { ModelStatic } from "sequelize";
import {
  NoteAttributes,
  NoteCreationAttributes,
  NoteInstance,
} from "../../types/notesAttributes.js";

class NoteRepository {
  private noteModel;

  constructor(noteModel: ModelStatic<NoteInstance>) {
    this.noteModel = noteModel;
  }

  async getAllNotes(id: number): Promise<NoteAttributes[]> {
    return this.noteModel.findAll({
      where: {
        userId: id,
      },
    });
  }

  async getNoteById(
    id: string,
    currUserId: string
  ): Promise<NoteAttributes | null> {
    return this.noteModel.findOne({
      where: {
        id,
        userId: currUserId,
      },
    });
  }

  async createNote(noteData: NoteCreationAttributes): Promise<NoteAttributes> {
    return this.noteModel.create(noteData);
  }

  async markNoteAsCompleted(
    id: string,
    userId: string
  ): Promise<[affectedCount: number]> {
    return await this.noteModel.update(
      { isCompleted: true },
      {
        where: {
          id,
          userId,
        },
      }
    );
  }

  async updateNote(
    id: string,
    userId: string,
    updateData: Pick<NoteAttributes, "text" | "title">
  ): Promise<[affectedCount: number]> {
    return await this.noteModel.update(updateData, {
      where: {
        id,
        userId,
      },
    });
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
