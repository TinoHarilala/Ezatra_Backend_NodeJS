import { NextFunction, Request, Response } from "express";
import ScoreService from "../services/score.service";

const service = new ScoreService()

export default class ScoreController {
    
    public static allList(req : Request, res : Response, next : NextFunction) {
        service.get().then(data=> {
            res.status(200).send(data)
        }).catch(error=> {
            next(error)
        })   
    }

    public static getHigherScore(req : Request, res : Response , next : NextFunction) {
        console.log(req.body)
        service.getHigher(req.body.iduser, req.body.idlvl).then(data => {
            res.status(200).send(data)
        }).catch(error=> {
            next(error)
        })
    }

    public static addScore(req : Request, res : Response , next : NextFunction) {
        service.create(req.body).then(data=> {
            res.status(200).send(data)
        }).catch(error=> {
            next(error)
        })
    }

}