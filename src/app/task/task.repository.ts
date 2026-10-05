import { ta } from "zod/v4/locales/index.js";
import { prisma } from "../../db/prisma";
import { TaskStatus, TaskPriority } from "../../generated/prisma/client";
import { TaskWhereInput } from "../../generated/prisma/models";
import { TaskDto } from "./dto/task.dto";
import { CreateTask, UpdateTask } from "./dto/task.schema";

export class TaskRepository {
    public async create(data: CreateTask): Promise<TaskDto>{
        const task = await prisma.task.create({data, include: { project: true, user: true }});
        return task;
    };

    public async getAllTasks (): Promise<TaskDto[]> {
        const tasks = await prisma.task.findMany({ include: { project: true, user: true } });
        return tasks;
    };

    public async findAll(page:number, limit: number, search?: string, status?: TaskStatus, priority?: TaskPriority, startDate?: Date, endDate?: Date ): Promise<{
        data: TaskDto[];
        pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        };
    }>{
        const skip = (page -1) * limit;

        const where: TaskWhereInput = {};

        if(search){
            where.title = {
                contains: search,
                mode: "insensitive"
            }
        }

        if(priority){
            where.priority = priority;
        };
        if(status){
            where.status = status;
        };

        if(startDate && endDate){
            where.startDate = {
                ...(startDate && { gte: startDate }),
                ...(endDate && { lte: endDate })
            } 
        };

        const [tasks, totalCount, statusCounts] = await Promise.all([
            prisma.task.findMany({
                where,
                include: { project:  {
                    select: {
                        id: true,
                        projectName: true,
                    },
                },
                    user:  {
                        select: {
                        id: true,
                        name: true,
                    },
                }},
                take: limit,
                skip,
                orderBy: { createdAt:"desc" }
            }),
            prisma.task.count({ where }),
            prisma.task.groupBy({
                where,
                by:['status'],
                _count: {
                    _all: true
                }
            })
        ]);

        const count = {
            PLANNED: 0,
            IN_PROGRESS: 0,
            COMPLETED: 0,
        };

        statusCounts.forEach((status) => {
           switch(status.status){
                case "COMPLETED":
                count.COMPLETED = status._count._all;
                break;
                case "PLANNED":
                count.PLANNED = status._count._all;
                break;
                case "IN_PROGRESS":
                count.IN_PROGRESS = status._count._all;
                break;
            }
        });

        const totalPages = Math.ceil(totalCount / limit);

        return {
        data: tasks,
        count,
        pagination: {
            page,
            limit,
            total: totalCount,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
        };
    };

    public async findById(id: string): Promise<TaskDto | null>{
        const task = await prisma.task.findUnique({ where: { id }, include: { project: true, user: true } });
        return task;
    };

    public async delete(id: string): Promise<TaskDto | null> {
        const task = await prisma.task.delete({ where: { id }, include: { project: true, user: true }});
        return task;
    };

    public async update(id: string, data: UpdateTask): Promise<TaskDto> {
        const task = await prisma.task.update({ where: { id }, data, include: { project: true, user: true } });
        return task;
    }
}