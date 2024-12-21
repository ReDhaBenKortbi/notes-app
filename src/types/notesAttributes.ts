import { Model, Optional } from "sequelize";

interface NoteAttributes {
  title: string;
  text: string;
  isCompleted: boolean;
  userId: string;
}

interface NoteCreationAttributes extends Optional<NoteAttributes, "userId"> {}

export interface NoteInstance
  extends Model<NoteAttributes, NoteCreationAttributes>,
    NoteAttributes {}
