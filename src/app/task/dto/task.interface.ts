import { TaskPriority, TaskStatus } from "../../../generated/prisma/client";

export type TaskStatusCountType = {
    ALL: number;
    PLANNED: number;
    IN_PROGRESS: number;
    COMPLETED: number;
};

export type TaskType = {
    title: string,
    description: string | null,
    status: TaskStatus,
    priority: TaskPriority,
    startDate: Date,
    endDate: Date,
    projectId: string,
    userId: string 
}