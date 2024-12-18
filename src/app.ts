import express, { Application, Request, Response } from "express";
import "dotenv/config";
import { morganMiddleware } from "./middleware/morgan.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import { mainLogger } from "./config/logger";

export const app: Application = express();

app.use(express.json());
app.use(morganMiddleware);
//Error middleware
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.all("*", (req: Request, res: Response) => {
  mainLogger.error("not found");
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource could not be found.",
  });
});
