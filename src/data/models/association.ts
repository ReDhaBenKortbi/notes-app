import { ModelStatic } from "sequelize";
import { sqlInstance } from "../../config/db";
import { mainLogger } from "../../config/logger";
import { noteOptions, notesMetaOptions } from "./notes.model";
import { userOptions, userMetaOptions } from "./users.model";
import { UserInstance } from "../../types/userAttributes";
import { NoteInstance } from "../../types/notesAttributes";

export const User: ModelStatic<UserInstance> = sqlInstance.define(
  "user",
  userOptions,
  userMetaOptions
);
export const Note: ModelStatic<NoteInstance> = sqlInstance.define(
  "note",
  noteOptions,
  notesMetaOptions
);

export async function associateModels() {
  try {
    // Define associations
    User.hasMany(Note, { onDelete: "CASCADE", onUpdate: "CASCADE" });
    Note.belongsTo(User);

    // Synchronize the models
    await sqlInstance.sync({ alter: true });
    mainLogger.info("Database synchronization completed successfully.");
  } catch (error) {
    mainLogger.error("Database synchronization failed", error);
    throw new Error("Database synchronization failed.");
  }
}
