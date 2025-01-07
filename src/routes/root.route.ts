import { Router } from "express";
import path from "path";
import { Request, Response } from "express";

class RootRoute {
  public router: Router;
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", (req: Request, res: Response) => {
      res.sendFile(path.join(import.meta.dirname, "static", "index.html"));
    });
  }
}

export default RootRoute;
