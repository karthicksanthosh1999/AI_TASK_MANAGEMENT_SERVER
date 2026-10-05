import { Request, Response } from "express";
import { TaskService } from "./task.service";
import { APIResponse } from "../../lib/APIResponse";
import { ApiError } from "../../lib/ApiError";
import { TaskStatus, TaskPriority } from "../../generated/prisma/browser";

export class TaskController {
    constructor(
        private readonly taskService = new TaskService(),
    ){}

    public create = async(req: Request, res: Response): Promise<void> => {
        const data = req.body;
        const task = await this.taskService.create(data);
        res.json(new APIResponse("Task Created Successfully", 201, task));
    };

    public getAllTasks = async(_req: Request, res: Response): Promise<void> => {
        const task = await this.taskService.getAllTasks();
        res.json(new APIResponse("Task Fetched Successfully", 200, task));
    };

    public findAll = async(req: Request, res: Response): Promise<void> => {
        const {
            page,
            limit,
            search,
            status,
            priority,
            startDate,
            endDate,
        } = req.query as {page: string, limit: string, search: string, status: TaskStatus, priority: TaskPriority, startDate: string, endDate: string};

        const task = await this.taskService.findAll(Number(page), Number(limit), search, status, priority, 
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined);
        res.json(new APIResponse("Task Fetched Successfully", 200, task));
    };

    public findById = async(req: Request<{ id: string}>, res: Response): Promise<void> => {
        const { id } = req.params;

        if(!id) throw new ApiError("Id is required", 400)
            const task = await this.taskService.findById(id);
        
        if(!task) throw new ApiError("Task is not found", 401)
        res.json(new APIResponse("Task Fetched Successfully", 200, task));
    };

    
    public delete = async(req: Request<{ id: string}>, res: Response): Promise<void> => {
        const { id } = req.params;

        if(!id) throw new ApiError("Id is required", 400)
            const task = await this.taskService.delete(id);
        
        if(!task) throw new ApiError("Task is not found", 401)
        res.json(new APIResponse("Task Deleted Successfully", 200, task));
    };
    public update = async(req: Request, res: Response): Promise<void> => {
        const data = req.body;

        if(!data?.id) throw new ApiError("Id is required", 400)
            const task = await this.taskService.update(data?.id, data);
        
        if(!task) throw new ApiError("Task is not found", 401)
        res.json(new APIResponse("Task Deleted Successfully", 200, task));
    };
}