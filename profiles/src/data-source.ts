import { DataSource } from "typeorm";
import config from "../config";
import { User } from "./entities/User";
import { Role } from "./entities/Role";
import { Occupation } from "./entities/Occupations";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.DB_HOST || "localhost",
    port: config.DB_PORT || 3306,
    username: config.DB_USERNAME || "root",
    password: config.DB_PASSWORD || "",
    database: config.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [User, Role, Occupation],
    subscribers: [],
    migrations: []
})