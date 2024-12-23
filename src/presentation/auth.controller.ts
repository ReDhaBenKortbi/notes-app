import asyncHandler from "express-async-handler";
import UserRepository from "../data/repositories/user.repository";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken";
interface LoginData {
  username: string;
  password: string;
}
class AuthController {
  private userRepo;
  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }
  login = asyncHandler(
    async (req: Request<{}, {}, LoginData>, res: Response) => {
      //@ts-ignore
      const loginData: { username: string; password: string } = req.body;

      if (!loginData.username || !loginData.password) {
        res.status(400).json({ message: "All fields are required." });
        return;
      }

      const user = await this.userRepo.getUserByUsername(loginData.username);

      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }

      if (!user.isActive) {
        res.status(403).json({ message: "User is not active." });
        return;
      }

      const match = await bcrypt.compare(loginData.password, user.password);

      if (!match) {
        res.status(401).json({ message: "Invalid credentials." });
        return;
      }

      const accessToken = generateToken("access", {
        userInfo: {
          username: user.username,
          roles: user.roles,
        },
      });
      const refreshToken = generateToken("refresh", {
        username: user.username,
      });

      res
        .cookie("jwt", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        })
        .json({ accessToken });
    }
  );

  refresh = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      res.status(401).json({ message: "No refresh token provided." });
      return;
    }

    const refreshToken = cookies.jwt;

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET || ""
      ) as { username: string };

      const user = await this.userRepo.getUserByUsername(decoded.username);

      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }

      const accessToken = generateToken("access", {
        userInfo: {
          username: user.username,
          roles: user.roles,
        },
      });

      res.json({ accessToken });
    } catch (error) {
      res.status(403).json({
        status: 403,
        message: "Token is invalid or expired",
      });
    }
  });

  logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      res.status(204).send(); // No content
      return;
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({ message: "Cookie was cleared." });
  });
}
export default AuthController;
