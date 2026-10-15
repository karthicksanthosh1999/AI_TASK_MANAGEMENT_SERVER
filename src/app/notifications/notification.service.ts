import { getID } from "../../utils/socket_server";
import { NotificationDto } from "./dto/notification.dto";
import { NotificationRepository } from "./notification.repository";

export class NotificationService {
    public constructor(
        private readonly notificationRepository = new NotificationRepository()
    ){};

    public async createTaskAssignedNotification(userId: string, taskId: string): Promise<NotificationDto> {
        let message = "Task assigned to you"
        const notification = await this.notificationRepository.createNotification(userId, taskId, message);
        getID().to(`user:${userId}`).emit("notification:new", notification)
        return notification;
    };

    public async getUsersNotifications(userId: string): Promise<NotificationDto[]> {
        const notifications = await this.notificationRepository.findByUserId(userId);
        return notifications;
    };

    public async maskAsRead(id: string, userId: string): Promise<NotificationDto> {
        const notification = await this.notificationRepository.maskAsRead(id, userId);
        return notification;
    };
}