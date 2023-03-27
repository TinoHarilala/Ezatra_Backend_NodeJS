import { validate } from "class-validator";
import { DeleteResult, UpdateResult } from "typeorm";
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

    /*---- CREATE ---*/
    async create (level : Level):Promise<Level> {
        if (!level || level != null) {
            try {
                const newLevel = {
                    exercice : level.exercice,
                    characters : level.characters,
                    length : level.length
                }
                AppDataSource.manager.create(Level,newLevel)
                const error = await validate(newLevel)
    
                if(error.length) {
                    throw new CustomError("DATA_NOT_VALID", 500)
                }
                else {
                    return await AppDataSource.manager.save(Level, newLevel)
                }
    
            } catch (error){
                throw new CustomError("ERROR", 500, {error})
            }
        }
    }

    //---------DELETE--------//
    async delete (idToDelete : number):Promise<DeleteResult> {
        if (!idToDelete || idToDelete != null) {
            try {
                return await AppDataSource.manager
                                        .createQueryBuilder(Level,'level')
                                        .softDelete()
                                        .where("id = :id", { id: idToDelete})
                                        .execute();
                } catch (error) {
                        return Promise.reject(error)
                }  
        }
        else {
            throw new CustomError("ID_NOT_DEFINED")
        }
         
    }

    //-------- UPDATE --------//
    async update ( levelToUpdate : Level ):Promise<UpdateResult> {
           
        try {
                return AppDataSource.manager.update(Level, {
                    id : levelToUpdate.id
                },
                {
                    characters : levelToUpdate.characters,
                    exercice : levelToUpdate.exercice,
                    length : levelToUpdate.length
                })
            } 
        catch (error) {
            return Promise.reject(error)
        }

    }
}