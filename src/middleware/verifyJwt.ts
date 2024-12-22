import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).send("Unauthorized");
    return;
  }

  const token: string = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, decoded) => {
    if (err) {
      return res.status(403).send("Forbidden");
    }

    // Safely add properties to the request object
    if (decoded && typeof decoded === "object") {
      //@ts-ignore
      req.user = decoded.userInfo?.username; // Type this in a global declaration if needed
      //@ts-ignore
      req.roles = decoded.userInfo?.roles;
    }
    next();
  });
};
