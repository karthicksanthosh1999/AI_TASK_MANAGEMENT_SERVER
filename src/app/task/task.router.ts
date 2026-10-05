import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { TaskController } from "./task.controller";

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post("/", AuthMiddleware.authenticate, taskController.create);
taskRouter.get("/", AuthMiddleware.authenticate, taskController.findAll);
taskRouter.get("/:id", AuthMiddleware.authenticate, taskController.findById);
taskRouter.get("/allTasks", AuthMiddleware.authenticate, taskController.findById);
taskRouter.put("/", AuthMiddleware.authenticate, taskController.update);
taskRouter.delete("/:id", AuthMiddleware.authenticate, taskController.delete);

export default taskRouter;