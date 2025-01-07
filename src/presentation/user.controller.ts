import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserService } from "../application/user.service.js";

class UserController {
  private userService: UserService;
  constructor(userRepo: UserService) {
    this.userService = userRepo;
  }

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const queryOptions = req.query;
    const { count, rows } = await this.userService.getAllUsers(queryOptions);
    res.status(200).json({ totalUsers: count, users: rows });
  });

  createUser = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body;
    const newUser = await this.userService.createUser(userData);
    res.status(201).json({
      message: "new user created successfully",
      new_user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        isActive: newUser.isActive,
      },
    });
  });

  updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { value } = req.body;
    const [affectedCount] = await this.userService.updateUserStatus(id, value);
    console.log(affectedCount);
    if (affectedCount === 0) {
      res.status(400).json({
        message: "no resource has updated",
      });
      return;
    }

    res.status(200).json({
      message: `user has been ${value ? "activated" : "disactivated"}`,
    });
  });

  updateUserRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;
    let newRole: "manager" | "employee" = "employee";

    if (role === "employee") {
      newRole = "manager";
    }

    const [affectedCount] = await this.userService.updateUserRole(id, newRole);

    if (affectedCount === 0) {
      res.status(400).json({
        message: "no resource has updated",
      });
      return;
    }

    res.status(200).json({
      message: `user has been ${
        newRole === "employee" ? "demoted to Employee" : "elevted to Manager"
      }`,
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
