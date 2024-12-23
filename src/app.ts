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
import { Note, User } from "./data/models/association";
import NoteRepository from "./data/repositories/note.repository";
import NoteController from "./presentation/note.controller";
import NoteRouter from "./routes/note.route";
import { UserService } from "./application/user.service";
import { NoteService } from "./application/note.service";
import AuthRouter from "./routes/auth.route";
import AuthController from "./presentation/auth.controller";

export const app: Application = express();

// dependency injection
//User
const userRepo = new UserRepository(User);
const userService = new UserService(userRepo);
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

//Note
const noteRepo = new NoteRepository(Note);
const noteService = new NoteService(noteRepo);
const noteController = new NoteController(noteService);
const noteRouter = new NoteRouter(noteController);

//Auth
const authController = new AuthController(userRepo);
const authRouter = new AuthRouter(authController);

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morganMiddleware);
app.use(cors(corsOptions));

// Routes
app.use("/users", userRouter.router);
app.use("/notes", noteRouter.router);
app.use("/auth", authRouter.router);

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
