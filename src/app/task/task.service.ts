import { TaskStatus, TaskPriority } from "../../generated/prisma/client";
import { TaskDto } from "./dto/task.dto";
import { CreateTask, UpdateTask } from "./dto/task.schema";
import { TaskRepository } from "./task.repository";

export class TaskService {
    constructor(
        private readonly taskRepository = new TaskRepository()
    ){}

    public async create(data: CreateTask): Promise<TaskDto> {
        const task = await this.taskRepository.create(data);
        return task;
    };

    public async getAllTasks(): Promise<TaskDto[]> {
        const task = await this.taskRepository.getAllTasks();
        return task;
    };

    public async findAll (
        page=1, 
        limit=10, 
        search?: string, 
        status?: TaskStatus, 
        priority?: TaskPriority, 
        startDate?: Date, 
        endDate?: Date
    ): Promise<{
        data: TaskDto[],
        pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number,
        hasNextPage: boolean,
        hasPreviousPage: boolean,
        }
    }> {
        const task = await this.taskRepository.findAll(page, limit, search, status, priority, startDate, endDate);
        return task;
    }

    public async findById (id: string): Promise<TaskDto | null> {
        const task = await this.taskRepository.findById(id);
        return task;
    };

    
    public async delete(id: string): Promise<TaskDto | null> {
        const task = await this.taskRepository.delete(id);
        return task;
    };

    public async update(id: string, data: UpdateTask): Promise<TaskDto> {
        const task = await this.taskRepository.update(id, data);
        return task;
    }
}