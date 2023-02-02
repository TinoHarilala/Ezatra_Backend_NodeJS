import { AppDataSource } from "../../data-source";
import { Level } from "../entities/level.entity";
import { CustomError } from "../models/custom-error.model";

export default class LevelService {

    async get():Promise<Level[] | null> {
        try {
            return await AppDataSource.manager.find(
                Level
            )

        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getFirst():Promise<Level> {
        try {
            return await AppDataSource.manager.createQueryBuilder(Level , 'level')
                                            .take(1)
                                            .getOne();
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getNext(id : Number):Promise<Level> {
        try {
            return await AppDataSource.manager.createQueryBuilder(Level, 'level')
                                                .where("level.id > :id", { id: id })
                                                .orderBy("level.id", "ASC")
                                                .skip(0)
                                                .take(1)
                                                .getOne();
            
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getById (id : number):Promise<Level | null> {
        try {
            if (id || isNaN(id)) {
                return await AppDataSource.manager.findOne(Level, {
                    where : {
                        id
                    }
                })
            }
            else {
                throw new CustomError('DATA_NOT_VALID', 400)
            }
            

        } catch (error) {
            return Promise.reject(error)
        }
    }
}