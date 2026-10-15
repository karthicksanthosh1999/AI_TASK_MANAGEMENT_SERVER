export class NotificationDto {
    public id: string;
    public userId: string;
    public taskId: string;
    public message: string;
    public isRead: boolean;

    public constructor(
        data: {
            id: string,
        userId: string,
        taskId: string,
        message: string,
        isRead: boolean,
        }
    ){
        this.id = data.id
        this.userId = data.userId
        this.taskId = data.taskId
        this.message = data.message
        this.isRead = data.isRead
    }
}