import { Router } from "express";
import { ProjectController } from "./project.controller";
import { ValidationMiddleware } from "../../middlewares/validation.middleware";
import { createProjectSchema } from "./dto/project.schema";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

const projectRouter = Router();

const projectController = new ProjectController();

projectRouter.post("/", AuthMiddleware.authenticate, ValidationMiddleware.validate(createProjectSchema), projectController.create);
projectRouter.get("/", AuthMiddleware.authenticate, projectController.findAll);
projectRouter.get("/allProjects", AuthMiddleware.authenticate, projectController.getAllProjects);
projectRouter.get("/projectsName", AuthMiddleware.authenticate, projectController.fetchProjects)
projectRouter.get("/:id", AuthMiddleware.authenticate, projectController.findById);
projectRouter.delete("/:id", AuthMiddleware.authenticate, projectController.deleteById);
projectRouter.put("/", AuthMiddleware.authenticate, projectController.updateById);

export default projectRouter;