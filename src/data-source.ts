import "reflect-metadata"
import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import { Level } from "./app/entities/level.entity"
import { Score } from "./app/entities/score.entity"
import { User } from "./app/entities/user.entity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "typing_club",
    synchronize: true,
    logging: true,
    entities: [Level, Score, User],
    migrations : [],
    namingStrategy: new SnakeNamingStrategy(),
    subscribers: [],
})
