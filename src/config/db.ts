import { Sequelize } from "sequelize";

const dbName = process.env.MYSQL_DB || "defaultDB";
const user = process.env.MYSQL_USER || "defaultUser";
const password = process.env.MYSQL_PASSWORD || "defaultPass";
const port = Number(process.env.MYSQL_PORT || 3306);
const host = process.env.MYSQL_HOST || "localhost";

export const sqlInstance = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: false,
});
