import { DataSource } from "typeorm";
import { Organo } from "./entities/Organo";
import { Usuario } from "./entities/Usuario";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,  // Solo en desarrollo
  logging: false,
  entities: [Organo, Usuario],
  migrations: [],
  subscribers: [],
});
