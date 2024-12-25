import { Model, Optional } from "sequelize";

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: "employee" | "manager" | "admin";
  isActive: boolean;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "isActive" | "role"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}
