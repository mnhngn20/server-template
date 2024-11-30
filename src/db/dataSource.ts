import { DataSource } from "typeorm";
import { entities } from "@/entities";
import { APP_CONFIG } from "../config";

console.log("aaa", !process.env.PG_PORT);

export const dataSource = new DataSource({
  type: "postgres",
  host: APP_CONFIG.dbHost,
  username: APP_CONFIG.dbUser,
  password: APP_CONFIG.dbPassword,
  database: APP_CONFIG.dbName,
  synchronize: false,
  logging: true,
  entities,
  migrations: ["./src/migrations/*.ts"],
  ssl: !process.env.PG_PORT,
});
