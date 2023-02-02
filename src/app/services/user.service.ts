import { validate } from "class-validator";
import { AppDataSource } from "../../data-source";
import { User } from "../entities/user.entity";
import { CustomError } from "../models/custom-error.model";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export default class UserService {
    
    async get():Promise<User[] | null> {
        try {
            return await AppDataSource.manager.find(
                User, {
                    relations :  {
                        scores : {
                            level : true
                        }
                    }
                }
            )
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async getByPk(id: number):Promise<User | null> {
        try {
            if (id && !isNaN(id)) {
                return await AppDataSource.manager.findOne(User, {
                    where: {
                        id
                    },
                    relations: {
                        scores : true
                    }
                });
            }
            else {
                throw new CustomError('DATA_NOT_VALID', 400);
            }
                
        }
        catch(error) {
            return Promise.reject(error);
        }
    }

    async create(data : User):Promise<User> {
        try {
            const manager = AppDataSource.manager

            bcrypt.hash(data.mdp, 10)
                .then(async (hash)=>{
                    const user = {
                        nom : data.nom,
                        mdp : hash
                    }
                    AppDataSource.manager.create(User, user)
                    const error = await validate(user)
                    if (error.length){
                        throw new CustomError('DATA_NOT_VALID',500, {error})
                    }
                    else {
                        return await manager.save(User,user)
                    }
                })
                .catch((error)=>{throw new CustomError('ERROR',500, {error})})

        } catch (error) {
            return Promise.reject(error)
        }
    }

    log(username :  string, mdp : string):Promise<{} | null> {
             return AppDataSource.manager.findOne(User, {
                where : {
                    nom : username
                }
            })
            .then(data => {
                if (!data) {
                     throw new CustomError('USER DOES\'NT EXIST', 401)
                }
                return bcrypt.compare(mdp, data.mdp )
                    .then(valid=>{
                        if(!valid) {
                            throw new CustomError('PASSWORD OR USERNAME INVALID', 401)
                        }
                        else {
                             return {
                                userId : data.id,
                                token : jwt.sign(
                                    {userId : data.id},
                                    'RANDOM_TOKEN_SECRET',
                                    {expiresIn : '8h'}
                                )
                            }
                        }
                    })
            })
            .catch((error)=>{throw new CustomError('ERROR', 500, {error})})
    }
}