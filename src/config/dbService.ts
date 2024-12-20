import { sqlInstance } from "./db";
import { mainLogger } from "./logger";

export async function testConnection() {
  try {
    await sqlInstance.authenticate();
    mainLogger.info("Database connection established successfully.");
  } catch (error) {
    mainLogger.error("Database connection failed", error);
    throw new Error("Database connection failed.");
  }
}
