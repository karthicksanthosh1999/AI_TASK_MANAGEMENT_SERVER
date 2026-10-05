import { ApiError } from "../../lib/ApiError";
import { PaginationDto } from "../../utils/paginationDto";
import { ProjectDto } from "./dto/project.dto";
import { CreateProject, UpdateProject } from "./dto/project.schema";
import { ProjectRepository } from "./project.repository";

export class ProjectService {
    constructor(
        private readonly projectRepository= new ProjectRepository()
    ){}

    public async create(data: CreateProject): Promise<ProjectDto>{
        const project = await this.projectRepository.create(data);
        return project;
    };
    public async getAllProjects(): Promise<ProjectDto[]>{
        const project = await this.projectRepository.getAllProjects();
        return project;
    };

    public async findAll(page= 1, limit=10, search?: string): Promise<PaginationDto<ProjectDto>> {
        const project = await this.projectRepository.findAll(page, limit, search);
        return project;
    };

    public async findById(id: string): Promise<ProjectDto > {
        if(!id) throw new ApiError("Id is required", 404);
        const project = await this.projectRepository.findById(id);
        if(!project) throw new ApiError("Project Not Found", 400);
        return project;
    };

    public async delete(id: string): Promise<ProjectDto > {
        if(!id) throw new ApiError("Id is required", 404);
        const project = await this.projectRepository.deleteById(id);
        if(!project) throw new ApiError("Project Not Found", 400);
        return project;
    };

    public async update(id: string, data: UpdateProject): Promise<ProjectDto> {
        if(!id) throw new ApiError("Id is required", 404);
        const project = await this.projectRepository.updateById(id, data);
        if(!project) throw new ApiError("Project Not Found", 400);
        return project;
    };

    public async fetchProjects(): Promise<{projectName:string, id: string}[]> {
        const projects = await this.projectRepository.fetchProjects();
        return projects;
    }
}