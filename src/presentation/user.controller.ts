import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserRepository from "../data/repositories/user.repository";
import { UserCreation } from "../types/repos/userRepoTypes";
import { UserService } from "../application/user.service";

class UserController {
  private userService;
  constructor(userRepo: UserService) {
    this.userService = userRepo;
  }

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const allUsers = await this.userService.getAllUsers();
    res.status(200).json({ users: allUsers });
  });

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;
    const newUser = await this.userService.createUser(userData);
    res.status(201).json({
      message: "new user created successfully",
      new_user: {
        id: newUser.id,
        username: newUser.username,
        roles: newUser.roles,
        isActive: newUser.isActive,
      },
    });
  });

  disactivateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const [affectedCounts] = await this.userService.disActivateUser(id);
    if (affectedCounts === 0) {
      res.status(400).json({
        message: "no resource has updated",
      });
    }
    res.status(200).json({
      message: "user has been disactivated",
    });
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedRows = await this.userService.deleteUser(id);
    if (deletedRows === 0) {
      res.status(400).json({
        message: "no resource has deleted",
      });
    }
    res.status(200).json({
      message: "user was deleted successfully",
    });
  });
}

export default UserController;
