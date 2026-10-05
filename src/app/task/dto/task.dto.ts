import { TaskStatus, TaskPriority, Project, User } from "../../../generated/prisma/client";

export class TaskDto {
    public title: string;
    public description: string | null
    public status: TaskStatus;
    public priority: TaskPriority;
    public startDate: Date;
    public endDate: Date;
    public projectId: string;
    public userId: string;
    public project: Project | null;
    public user: User | null;

    constructor(data: {
        title: string,
        description: string | null,
        status: TaskStatus,
        priority: TaskPriority,
        startDate: Date,
        endDate: Date,
        projectId: string,
        userId: string 
        project: Project | null,
        user: User | null
    }){ 
        this.title = data.title
        this.description = data.description
        this.priority = data.priority
        this.status = data.status
        this.startDate = data.startDate
        this.endDate = data.endDate
        this.projectId = data.projectId
        this.userId = data.userId
        this.project = data.project
        this.user = data.user
    }   

}