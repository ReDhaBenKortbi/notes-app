import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

class UserController {
  private userRepo;
  constructor(userRepo: any) {
    this.userRepo = userRepo;
  }

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const allUsers = await this.userRepo.getAllUsers();
    res.status(200).json({ users: allUsers });
  });

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;
    const newUser = await this.userRepo.createUser(userData);
    res.status(201).json({
      message: "new user created successfully",
      new_user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.roles,
        isActive: newUser.isActive,
      },
    });
  });

  disactivateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.userRepo.disactivateUser(id);
    res.status(200).json({
      message: "user has been disactivated",
    });
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.userRepo.deleteUser(id);
    res.status(200).json({
      message: "user was deleted successfully",
    });
  });
}

export default UserController;
