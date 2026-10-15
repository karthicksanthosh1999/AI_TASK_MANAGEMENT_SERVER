import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { NotificationController } from "./notification.controller";

const notificationRouter = Router()

const notificationController = new NotificationController();

notificationRouter.post("/", AuthMiddleware.authenticate, notificationController.createNotification);
notificationRouter.get("/:userId", AuthMiddleware.authenticate, notificationController.getAllNotificationByUserId);
notificationRouter.put("/", AuthMiddleware.authenticate, notificationController.markAsRead);

export default notificationRouter;