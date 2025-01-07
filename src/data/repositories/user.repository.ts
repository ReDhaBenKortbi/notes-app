import { ModelStatic, Op, where } from "sequelize";
import {
  UserAttributes,
  UserCreationAttributes,
  UserInstance,
} from "../../types/userAttributes.js";

interface queryOptions {
  offset: number | undefined;
  limit: number | undefined;
  order: string;
  where:
    | undefined
    | {
        username: string;
      };
}
class UserRepository {
  constructor(private userModel: ModelStatic<UserInstance>) {
    this.userModel = userModel;
  }

  async countAllUsers() {
    return this.userModel.count();
  }

  async getAllUsers(queryOptions: any): Promise<{
    count: number;
    rows: UserAttributes[];
  }> {
    return this.userModel.findAndCountAll({
      attributes: { exclude: ["password"] },
      offset: queryOptions.offset,
      limit: queryOptions.limit,
      order: queryOptions.order,
      where: queryOptions.where,
    });
  }
  async getUserByUsername(username: string): Promise<UserAttributes | null> {
    return this.userModel.findOne({
      where: {
        username,
      },
    });
  }
  async getUserById(id: string): Promise<UserAttributes | null> {
    return this.userModel.findByPk(parseInt(id));
  }
  async createUser(userData: UserCreationAttributes): Promise<UserAttributes> {
    return this.userModel.create(userData);
  }
  async updateUserStatus(
    id: string,
    value: boolean
  ): Promise<[affectedCount: number]> {
    return await this.userModel.update(
      { isActive: value },
      {
        where: {
          id,
        },
      }
    );
  }
  async updateUserRole(
    id: string,
    role: "employee" | "manager"
  ): Promise<[affectedCount: number]> {
    return await this.userModel.update(
      { role },
      {
        where: {
          id,
        },
      }
    );
  }
  async deleteUser(id: string): Promise<number> {
    return this.userModel.destroy({
      where: {
        id,
      },
    });
  }
}

export default UserRepository;
