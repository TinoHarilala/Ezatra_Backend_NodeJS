import { Router } from "express";
import ScoreController from "../contollers/score.controller";
import Authorization from "../middlewares/auth";
const scoreRoute = Router()

    scoreRoute.get('/',Authorization, ScoreController.allList)
    scoreRoute.post('/higher', Authorization, ScoreController.getHigherScore)
    scoreRoute.post('/', Authorization, ScoreController.addScore)

export default scoreRoute