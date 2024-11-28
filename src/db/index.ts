import { DataSource } from "typeorm";
import { entities } from "../entities";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  synchronize: false,
  logging: true,
  entities,
  migrations: ["./src/migrations/*.ts"],
});
