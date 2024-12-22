import { ModelStatic } from "sequelize";
import {
  UserAttributes,
  UserCreationAttributes,
  UserInstance,
} from "../../types/userAttributes";
class UserRepository {
  constructor(private userModel: ModelStatic<UserInstance>) {
    this.userModel = userModel;
  }

  async getAllUsers(): Promise<UserAttributes[]> {
    return this.userModel.findAll({
      attributes: { exclude: ["password"] },
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

  async disactivateUser(id: string): Promise<[affectedCount: number]> {
    return await this.userModel.update(
      { isActive: false },
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
