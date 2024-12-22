import asyncHandler from "express-async-handler";
import UserRepository from "../data/repositories/user.repository";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthController {
  private userRepo;
  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }
  login = asyncHandler(async (req: Request, res: Response) => {
    //@ts-ignore
    const loginData: { username: string; password: string } = req.body;

    if (!loginData.username || !loginData.password) {
      res.status(400).json({
        message: "all fields are required",
      });
      return;
    }

    const user = await this.userRepo.getUserByUsername(loginData.username);

    if (user === null) {
      res.status(401).json({
        message: "user doesn't exist",
      });
      return;
    } else if (!user.isActive) {
      res.status(401).json({
        message: "user is not active",
      });
      return;
    } else {
      const match = await bcrypt.compare(loginData.password, user.password);

      if (!match) {
        res.status(401).json({
          message: "username or password is wrong",
        });
      } else {
        const accessToken = jwt.sign(
          {
            userInfo: {
              username: user.username,
              roles: user.roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET || "defaultSecret",
          { expiresIn: "10s" }
        );
        const refreshToken = jwt.sign(
          {
            username: user.username,
          },
          process.env.REFRESH_TOKEN_SECRET || "defaultSecret",
          { expiresIn: "1d" }
        );

        res
          .cookie("jwt", refreshToken, {
            httpOnly: true, //accessible only by the server
            secure: true, //for https
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000, //1d
          })
          .json({
            accessToken,
          });
      }
    }
  });
  refresh = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;

    if (!cookies.jwt) {
      res.status(401).json({ message: "No refresh token" });
      return;
    }

    const refreshToken = cookies.jwt;

    try {
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET || "",
          (err: any, decoded: any) => {
            if (err) reject(err);
            resolve(decoded);
          }
        );
      });

      const user = await this.userRepo.getUserByUsername(
        (decoded as any).username
      );

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const accessToken = jwt.sign(
        {
          userInfo: {
            username: user.username,
            roles: user.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET || "defaultSecret",
        { expiresIn: "10s" }
      );

      res.json({ accessToken });
    } catch (error) {
      res.status(403).json({ message: "Invalid token" });
    }
  });

  logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      res.status(204).json();
      return;
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.json({ message: "Cookie was cleared" });
  });
}
export default AuthController;
