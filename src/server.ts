import { Application } from "express";
import { app } from "./app";
import { testConnection } from "./config/dbService";
import { associateModels } from "./data/models/association";
import { mainLogger } from "./config/logger";

const port = process.env.PORT || "3000";

async function startServer(app: Application, port: string) {
  try {
    // Test the database connection
    await testConnection();

    // Associate models and synchronize the database
    await associateModels();

    app.listen(port, () => {
      mainLogger.info(`Server is running on ${port}`);
    });
  } catch (error) {
    // Log the error and exit the process
    mainLogger.error("Failed to start the server:", error);
    process.exit(1);
  }
}

startServer(app, port);
