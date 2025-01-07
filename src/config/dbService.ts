import { sqlInstance } from "./db.js";
import { mainLogger } from "./logger.js";

export async function testConnection() {
  try {
    await sqlInstance.authenticate();
    mainLogger.info("Database connection established successfully.");
  } catch (error) {
    console.log(error);
    mainLogger.error("Database connection failed", error);
    throw new Error("Database connection failed.");
  }
}
