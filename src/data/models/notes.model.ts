import { DataTypes } from "sequelize";

export const noteOptions = {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};
export const notesMetaOptions = {
  timestamps: true,
};
