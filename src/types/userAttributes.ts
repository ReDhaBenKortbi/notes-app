import { Model, Optional } from "sequelize";

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  confirmPassword: string;
  roles: Array<"employee" | "manager" | "admin">;
  isActive: boolean;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "roles" | "isActive" | "roles"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}
