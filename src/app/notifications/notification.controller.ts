import { Request, Response } from "express";
import { NotificationService } from "./notification.service";
import { ApiError } from "../../lib/ApiError";
import { APIResponse } from "../../lib/APIResponse";

export class NotificationController {
  public constructor(
    private readonly notificationService = new NotificationService(),
  ) {}

  public createNotification = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { userId, taskId } = req.body;
    const notification =
      await this.notificationService.createTaskAssignedNotification(
        userId,
        taskId,
      );

    if (!userId && !taskId)
      throw new ApiError("UserId and TaskId is required", 400);

    res.json(
      new APIResponse("Notification created successfully", 201, notification),
    );
  };

  public getAllNotificationByUserId = async (
    req: Request<{ userId: string }>,
    res: Response,
  ): Promise<void> => {
    const { userId } = req.params;

    if (!userId) throw new ApiError("TaskId is required", 400);
    const notifications =
      await this.notificationService.getUsersNotifications(userId);

    if (!notifications) throw new ApiError("Notification not found", 400);

    res.json(
      new APIResponse("Notification fetch successfully", 200, notifications),
    );
  };

  public markAsRead = async (req: Request, res: Response): Promise<void> => {
    const { id, userId } = req.body;
    if (!userId && !id) throw new ApiError("UserId and id is required", 400);
    const notification = await this.notificationService.maskAsRead(id, userId);

    res.json(new APIResponse("User read notification", 200, notification));
  };
}
