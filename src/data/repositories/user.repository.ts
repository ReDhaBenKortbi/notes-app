class UserRepository {
  private model;

  constructor(model: any) {
    this.model = model;
  }

  async getAllUsers() {
    return this.model.findAll({
      attributes: { exclude: ["password"] },
    });
  }

  async createUser(userData: any) {
    return this.model.create(userData);
  }

  async disactivateUser(id: string) {
    return await this.model.update(
      { isActive: false },
      {
        where: {
          id,
        },
      }
    );
  }

  async deleteUser(id: string) {
    return this.model.destroy({
      where: {
        id,
      },
    });
  }
}

export default UserRepository;
