class NoteRepository {
  private model;

  constructor(model: any) {
    this.model = model;
  }

  async getAllNotes() {
    return this.model.findAll();
  }

  async createNote(noteData: any) {
    return this.model.create(noteData);
  }

  async markNoteAsCompleted(id: string) {
    return await this.model.update(
      { isCompleted: true },
      {
        where: {
          id,
        },
      }
    );
  }

  async deleteNote(id: string) {
    return this.model.destroy({
      where: {
        id,
      },
    });
  }
}

export default NoteRepository;
