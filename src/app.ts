import express, { Application, urlencoded } from "express";
import "dotenv/config";
import { morganMiddleware } from "./middleware/morgan.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
import cookieParser from "cookie-parser";
import UserRepository from "./data/repositories/user.repository.js";
import UserController from "./presentation/user.controller.js";
import UserRouter from "./routes/user.route.js";
import { mainLogger } from "./config/logger.js";
import { Note, User } from "./data/models/association.js";
import NoteRepository from "./data/repositories/note.repository.js";
import NoteController from "./presentation/note.controller.js";
import NoteRouter from "./routes/note.route.js";
import { UserService } from "./application/user.service.js";
import { NoteService } from "./application/note.service.js";
import AuthRouter from "./routes/auth.route.js";
import AuthController from "./presentation/auth.controller.js";

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
