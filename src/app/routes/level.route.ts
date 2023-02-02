import { Router } from "express";
import LevelController from "../contollers/level.contoller";
import Authorization from "../middlewares/auth";

const levelRoute = Router()

    levelRoute.get('/', Authorization, LevelController.listAll)    
    levelRoute.get('/firstItem', Authorization, LevelController.getFirstLevel)
    levelRoute.post('/nextItem', Authorization, LevelController.getNextItem)
    levelRoute.post('/getByPk', Authorization, LevelController.getByPk)

export default levelRoute