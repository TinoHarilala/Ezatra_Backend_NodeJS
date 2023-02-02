import { NextFunction, Request, Response } from "express";
import LevelService from "../services/level.service";

const service = new LevelService()

export default class LevelController {
    
    public static listAll(req : Request, res : Response, next : NextFunction) {
        service.get().then((data)=> {
            res.status(200).send(data)
        }).catch((error)=> {
            next(error) 
        })
    } 

    public static getFirstLevel(req : Request, res : Response, next : NextFunction ) {
        service.getFirst().then((data)=> {
            res.status(200).send(data)
        }).catch(error=> {
            next(error);
        })
    }

    public static getNextItem ( req : Request, res : Response, next : NextFunction) {
        service.getNext(req.body.id).then((data)=>{
            res.status(200).send(data)
        }).catch(error=>{
            next(error)
        })
    }

    public static getByPk(req : Request, res : Response, next : NextFunction) {
        service.getById(req.body.id).then(data=> {
            res.status(200).send(data)
        }).catch(error=> {
            next(error)
        })
    }
}