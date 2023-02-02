import { NextFunction, Request, Response } from "express"

import * as express from 'express';
import * as jwt from 'jsonwebtoken'

interface ExtendRequest extends express.Request {
    auth?: {
        userId : any;
    }
}

function Authorization (req : ExtendRequest, res : Response, next : NextFunction ){
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId
        req.auth = {
            userId
        }
        next()
    }
    catch(error) {
        res.status(401).json({error : 'UNAUTHORIZED'}) 
    }
}
export default Authorization