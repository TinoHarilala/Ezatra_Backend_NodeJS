import { max, validate } from "class-validator";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Score } from "../entities/score.entity";
import { CustomError } from "../models/custom-error.model";

export default class ScoreService {

    async get():Promise<Score[] | null> {
        try {
            
            return await AppDataSource.manager.find(
                Score, {
                    relations : {
                        user : true,
                        level : true
                    }
                }
            )

        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getHigher(iduser : number, idlvl : number):Promise<Score> {
        try {
            const score = AppDataSource.manager.createQueryBuilder(Score, 'score')
                            .select('score.user')
                            .addSelect('MAX(score)','point')
                            .where('score.user = :iduser', {iduser})
                            .andWhere('score.level = :idlvl', {idlvl})
                            .groupBy('score.level')
                            .getRawOne();
            return score;                

        } catch (error) {
            return Promise.reject(error)
        }
    }

    async create(data : any):Promise<Score> {
        try {
            const manager = AppDataSource.manager
            const score = manager.create(Score, data)
            const error = await validate(score)

            if(error.length) {
                throw new CustomError('DATA_NOT_VALID', 400 , {error})
            }
            else {
                return await manager.save(Score, score)
            }

        } catch (error) {
            return Promise.reject(error)
        }
    }

}