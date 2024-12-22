import { Router } from "express";
import UserController from "../presentation/user.controller";
import { verifyJwt } from "../middleware/verifyJwt";
class UserRouter {
  public router: Router;

  constructor(private userController: UserController) {
    this.router = Router();
    this.router.use(verifyJwt);
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/all-users", this.userController.getAllUsers);
    this.router.post("/create-user", this.userController.createUser);
    this.router.put(
      "/disactivate-user/:id",
      this.userController.disactivateUser
    );
    this.router.delete("/delete-user/:id", this.userController.deleteUser);
  }
}

export default UserRouter;
