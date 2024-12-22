import { Router } from "express";
import { limiter } from "../middleware/httpLimiter";
import AuthController from "../presentation/auth.controller";

class AuthRouter {
  public router: Router;
  constructor(private authController: AuthController) {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post("/login", limiter, this.authController.login);
    this.router.get("/refresh", this.authController.refresh);
    this.router.post("/logout", this.authController.logout);
  }
}

export default AuthRouter;
