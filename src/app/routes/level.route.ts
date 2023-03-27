import { Router } from "express";
import LevelController from "../contollers/level.contoller";
import Authorization from "../middlewares/auth";

const levelRoute = Router()

    levelRoute.get('/', LevelController.listAll)    
    levelRoute.post('/', LevelController.addNewLevel)
    levelRoute.get('/firstItem', Authorization, LevelController.getFirstLevel)
    levelRoute.post('/nextItem', Authorization, LevelController.getNextItem)
    levelRoute.post('/getByPk', LevelController.getByPk)
    levelRoute.delete('', LevelController.deleteLevel)
    levelRoute.patch('', LevelController.updateLevel)

export default levelRoute