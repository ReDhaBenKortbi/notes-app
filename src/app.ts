import express, { Application, urlencoded } from "express";
import "dotenv/config";
import { morganMiddleware } from "./middleware/morgan.middleware";
import { errorMiddleware } from "./middleware/error.middleware";
import cors from "cors";
import { corsOptions } from "./config/cors";
import cookieParser from "cookie-parser";
import UserRepository from "./data/repositories/user.repository";
import UserController from "./presentation/user.controller";
import UserRouter from "./routes/user.route";
import { mainLogger } from "./config/logger";
import { User } from "./data/models/association";

export const app: Application = express();

// dependency injection
const userRepo = new UserRepository(User);
const userController = new UserController(userRepo);
const userRouter = new UserRouter(userController);

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(morganMiddleware);
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/users", userRouter.router);

app.all("*", (req, res) => {
  console.log(`404 hit for path: ${req.path}`); // Add this log
  mainLogger.error(`not found: ${req.path}`);
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource could not be found.",
    path: req.path,
  });
});

// Error middleware - should be last
app.use(errorMiddleware);
