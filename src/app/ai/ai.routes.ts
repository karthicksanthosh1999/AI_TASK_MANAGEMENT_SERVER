import { Router } from "express";
import { AIController } from "./ai.controller";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

const AIRouter = Router();

const aiCOntroller = new AIController();

AIRouter.get("/task-prioritization", AuthMiddleware.authenticate, aiCOntroller.aiTaskPrioritization)


export default AIRouter;