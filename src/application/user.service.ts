import UserRepository from "../data/repositories/user.repository";
import {
  UserAttributes,
  UserCreationAttributes,
} from "../types/userAttributes";
import { isValidPassword } from "../utils/passwordChecker";
import { isValidUsername } from "../utils/usernameChecker";

export class UserService {
  private userRepo;
  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async getAllUsers(): Promise<UserAttributes[]> {
    return this.userRepo.getAllUsers();
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

  async disActivateUser(id: string): Promise<[affectedCount: number]> {
    const user = await this.userRepo.getUserById(id);
    if (user === null) {
      throw new Error("invalid resource");
    }
    return this.userRepo.disactivateUser(id);
  }

  async deleteUser(id: string): Promise<number> {
    const user = await this.userRepo.getUserById(id);
    if (!user) {
      throw new Error("invalid resource");
    }
    return this.userRepo.deleteUser(id);
  }
}
