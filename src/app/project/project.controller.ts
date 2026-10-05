import { Request, Response } from "express";
import { ProjectService } from "./project.service";
import { APIResponse } from "../../lib/APIResponse";
import { ApiError } from "../../lib/ApiError";

export class ProjectController {
    constructor(
        private readonly projectService = new ProjectService()
    ){}

    public create = async(req: Request, res: Response): Promise<void> => {
        const data = req.body;
        const project = await this.projectService.create(data);
        res.json( new APIResponse("Project Created Successfully", 201, project))        
    };

    public getAllProjects = async(_req: Request, res: Response): Promise<void> => {
        const project = await this.projectService.getAllProjects();
        res.json( new APIResponse("Project Fetched Successfully", 200, project))        
    };

    public findAll = async(req: Request, res: Response): Promise<void> => {
        const {page, limit, search} = req.query as {page: string, limit: string, search: string};
        if(!page || !limit){
            throw new ApiError("Page and Limit are required", 400);
        };

        const project = await this.projectService.findAll(Number(page), Number(limit), search);
        res.json(new APIResponse("Fetch All Projects Successfully", 200, project))
    };

    public findById = async(req: Request<{id: string}>, res: Response): Promise<void> => {
        const {id} = req.params;
        const project = await this.projectService.findById(id);
        res.json(new APIResponse("Project Fetch Successfully", 200, project));
    };
    
    public deleteById = async(req: Request<{id: string}>, res: Response): Promise<void> => {
        const {id} = req.params;
        const project = await this.projectService.delete(id);
        res.json(new APIResponse("Project Deleted Successfully", 200, project));
    };
    
    public updateById = async(req: Request, res: Response): Promise<void> => {
        const data = req.body;
        const project = await this.projectService.update(data?.id, data);
        res.json(new APIResponse("Project Updated Successfully", 200, project));
    };

    public fetchProjects = async(_req: Request, res: Response): Promise<void> => {
        const project = await this.projectService.fetchProjects();
        res.json(new APIResponse("Project Fetch Successfully", 200, project));
    };
}