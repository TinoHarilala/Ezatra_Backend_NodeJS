import { Router } from "express";
import levelRoute from "./level.route";
import scoreRoute from "./score.route";
import userRoute from "./user.route";

const routes = Router();

routes.use('/users', userRoute )
routes.use('/levels', levelRoute)
routes.use('/scores', scoreRoute)

export default routes;