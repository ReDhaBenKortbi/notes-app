import express, { Application, Request, Response } from "express";
import { configDotenv } from "dotenv";
configDotenv();
export const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});
