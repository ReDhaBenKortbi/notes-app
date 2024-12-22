export type User = {
  id: string;
  username: string;
  isActive: boolean;
  roles: Array<"employee" | "manager" | "admin">;
};

export type UserCreation = Omit<User, "id" | "isActive"> & {
  password: string;
};
