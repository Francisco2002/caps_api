import { DataSource } from "typeorm";
import { User } from "./entities/users";
import { AuthToken } from "./entities/authToken";
import config from "../config";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.DB_HOST,
    port: config.DB_PORT || 3306,
    username: config.DB_USERNAME || "root",
    password: config.DB_PASSWORD || "",
    database: config.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [User, AuthToken],
    subscribers: [],
    migrations: []
});