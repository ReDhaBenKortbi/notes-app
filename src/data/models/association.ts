import { ModelStatic } from "sequelize";
import { sqlInstance } from "../../config/db.js";
import { mainLogger } from "../../config/logger.js";
import { noteOptions, notesMetaOptions } from "./notes.model.js";
import { userOptions, userMetaOptions } from "./users.model.js";
import { UserInstance } from "../../types/userAttributes.js";
import { NoteInstance } from "../../types/notesAttributes.js";

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
    await sqlInstance.sync();
    mainLogger.info("Database synchronization completed successfully.");
  } catch (error) {
    mainLogger.error("Database synchronization failed", error);
    throw new Error("Database synchronization failed.");
  }
}
