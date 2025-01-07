import { Router } from "express";
import UserController from "../presentation/user.controller.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

class UserRouter {
  public router: Router;

  constructor(private userController: UserController) {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/all-users", verifyJwt, this.userController.getAllUsers);
    // this.router.get(
    //   "/search",
    //   verifyJwt,
    //   this.userController.searchUsersByUsername
    // );
    this.router.post("/create-user", this.userController.createUser);
    this.router.post(
      "/update-user-status/:id",
      verifyJwt,
      this.userController.updateUserStatus
    );
    this.router.post(
      "/update-user-role/:id",
      verifyJwt,
      this.userController.updateUserRole
    );
    this.router.post(
      "/delete-user/:id",
      verifyJwt,
      this.userController.deleteUser
    );
  }
}

export default UserRouter;
