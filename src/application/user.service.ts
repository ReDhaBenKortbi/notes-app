import { Op } from "sequelize";
import UserRepository from "../data/repositories/user.repository.js";
import {
  UserAttributes,
  UserCreationAttributes,
} from "../types/userAttributes.js";
import { isValidPassword } from "../utils/passwordChecker.js";
import { isValidUsername } from "../utils/usernameChecker.js";

export class UserService {
  private userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async getAllUsers(queryOptions: {
    offset?: string;
    limit?: string;
    order?: "ASC" | "DESC";
    sort?: "username" | "id";
    username?: string;
    roles?: string;
    isActive?: string;
  }): Promise<{
    count: number;
    rows: UserAttributes[];
  }> {
    const offset = parseInt(queryOptions.offset || "0", 10);
    const limit = parseInt(queryOptions.limit || "10", 10);
    const order = queryOptions.order || "ASC";
    const sort = queryOptions.sort || "id";

    const arrayOfRoles = queryOptions.roles
      ? queryOptions.roles.split(",")
      : [];

    const whereClause = {
      ...(queryOptions.username && {
        username: { [Op.like]: `${queryOptions.username}%` },
      }),
      ...(arrayOfRoles.length > 0 && {
        role: { [Op.in]: arrayOfRoles },
      }),
      ...(queryOptions.isActive && {
        isActive: queryOptions.isActive === "true",
      }),
    };

    const orderClause: Array<[string, string]> = [[sort, order]];

    return this.userRepo.getAllUsers({
      offset,
      limit,
      order: orderClause,
      where: whereClause,
    });
  }

  async createUser(userData: UserCreationAttributes): Promise<UserAttributes> {
    const user = await this.userRepo.getUserByUsername(userData.username);
    if (user) {
      throw new Error("User already exists");
    }
    if (!isValidUsername(userData.username)) {
      throw new Error("Invalid username");
    }
    if (userData.password !== userData.confirmPassword) {
      throw new Error("Password does not match");
    }
    if (!isValidPassword(userData.password)) {
      throw new Error("Password is weak");
    }

    return this.userRepo.createUser(userData);
  }

  async updateUserStatus(
    id: string,
    value: boolean
  ): Promise<[affectedCount: number]> {
    const user = await this.userRepo.getUserById(id);
    if (user === null) {
      throw new Error("invalid resource");
    }
    return this.userRepo.updateUserStatus(id, value);
  }

  async updateUserRole(
    id: string,
    role: "employee" | "manager"
  ): Promise<[affectedCount: number]> {
    const user = await this.userRepo.getUserById(id);
    if (user === null) {
      throw new Error("invalid resource");
    }

    return this.userRepo.updateUserRole(id, role);
  }

  async deleteUser(id: string): Promise<number> {
    const user = await this.userRepo.getUserById(id);
    if (!user) {
      throw new Error("invalid resource");
    }
    return this.userRepo.deleteUser(id);
  }
}
