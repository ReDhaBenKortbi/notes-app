import { Model, Optional } from "sequelize";

export interface NoteAttributes {
  id: string;
  title: string;
  text: string;
  isCompleted: boolean;
  userId: string;
}

export interface NoteCreationAttributes
  extends Optional<NoteAttributes, "id" | "isCompleted"> {}

export interface NoteInstance
  extends Model<NoteAttributes, NoteCreationAttributes>,
    NoteAttributes {}
