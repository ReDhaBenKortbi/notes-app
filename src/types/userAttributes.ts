import { Model, Optional } from "sequelize";

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  roles: Array<"employee" | "manager" | "admin">;
  isActive: boolean;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "roles" | "isActive"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}
