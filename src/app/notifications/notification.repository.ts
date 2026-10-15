import { prisma } from "../../db/prisma";
import { NotificationDto } from "./dto/notification.dto";

export class NotificationRepository {
    public async createNotification(userId: string, taskId: string, message: string): Promise<NotificationDto> {
        const notification = await prisma.notification.create({
            data: {
                userId, taskId, message
            }
        });
        return notification;
    };

    public async findByUserId(userId: string): Promise<NotificationDto[]> {
        const notifications = await prisma.notification.findMany(
            {
                where: {
                    userId
                }
            }
        );

        return notifications;
    };

    public async maskAsRead(id: string, userId: string): Promise<NotificationDto> {
        const notification = await prisma.notification.update({
            where: { id, userId, isRead: false },
            data : { isRead: true }
        });

        return notification;
    }
}