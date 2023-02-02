import { NextFunction, Request, Response } from "express-serve-static-core";
import UserService from "../services/user.service";

const services = new UserService()

export default class userController {

    public static listAll(req : Request, res : Response, next : NextFunction) {
        services.get().then(data=> {
            res.status(200).send(data);
        }).catch((err)=> {
            next(err)
        })
    } 
    
    public static getOneById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        services.getByPk(+id).then(data => {
            res.status(200).send(data);
        }).catch(err => {
            next(err);
        })
    }

    public static Add(req : Request, res : Response, next : NextFunction) {
        services.create(req.body).then((data)=> {
            res.status(200).send(data);
        }).catch(err=> {
            next(err)
        })
    }

    public static login ( req : Request, res : Response, next : NextFunction) {
        services.log(req.body.nom, req.body.mdp).then((data)=> {
            res.status(200).send(data);
        }).catch((error)=>{
            next(error)
        })
    }
}