import { sqlInstance } from "../../config/db";
import { mainLogger } from "../../config/logger";
import { noteOptions, notesMetaOptions } from "./notes.model";
import { userOptions, userMetaOptions } from "./users.model";

export const User = sqlInstance.define("user", userOptions, userMetaOptions);
export const Note = sqlInstance.define("note", noteOptions, notesMetaOptions);

export async function associateModels() {
  try {
    // Define associations
    User.hasMany(Note);
    Note.belongsTo(User);

    // Synchronize the models
    await sqlInstance.sync({ alter: true });
    mainLogger.info("Database synchronization completed successfully.");
  } catch (error) {
    mainLogger.error("Database synchronization failed", error);
    throw new Error("Database synchronization failed.");
  }
}
