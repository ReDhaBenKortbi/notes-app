import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export const userOptions = {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "employee",
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

export const userMetaOptions = {
  timestamps: false,
  hooks: {
    beforeCreate: async (user: any, optons: any) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    },
  },
};
