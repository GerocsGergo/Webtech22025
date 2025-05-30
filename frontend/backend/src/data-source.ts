import "reflect-metadata"
import { DataSource } from "typeorm"
import { Game } from "./entity/Game"
import { Staff} from "./entity/Staff"
import { Admin } from "./entity/Admin"
import dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Game, Staff, Admin],
    migrations: [],
    subscribers: [],
})
