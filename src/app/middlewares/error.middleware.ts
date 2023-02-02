import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/custom-error.model";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    let customError = err;
    
    if (!(err instanceof CustomError)) {
        customError = new CustomError('SERVER_ERROR')
    }

    res.status((customError as CustomError).status).send(customError);
}

export default errorHandler;