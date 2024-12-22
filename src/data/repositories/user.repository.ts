import { ModelStatic } from "sequelize";
import { UserInstance } from "../../types/userAttributes";
import { User, UserCreation } from "../../types/repos/userRepoTypes";
class UserRepository {
  constructor(private userModel: ModelStatic<UserInstance>) {
    this.userModel = userModel;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: { exclude: ["password"] },
    });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        username,
      },
    });
  }
  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findByPk(parseInt(id));
  }

  async createUser(userData: UserCreation): Promise<User> {
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
