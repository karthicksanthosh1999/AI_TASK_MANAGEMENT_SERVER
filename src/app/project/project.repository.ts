import { prisma } from "../../db/prisma";
import { ProjectWhereInput } from "../../generated/prisma/models";
import { PaginationDto } from "../../utils/paginationDto";
import { ProjectDto } from "./dto/project.dto";
import { CreateProject, UpdateProject } from "./dto/project.schema";

export class ProjectRepository{
    public async create(data: CreateProject): Promise<ProjectDto> {
        return await prisma.project.create({ data })
    };

    public async getAllProjects(): Promise<ProjectDto[]> {
        return await prisma.project.findMany();
    };
    
    public async findAll(page: number, limit: number, search? :string): Promise<PaginationDto<ProjectDto> & { count: { PLANNED: number; RUNNING: number; COMPLETED: number } }> {
        const skip = (page - 1) * limit;
        const where: ProjectWhereInput = search ? 
                {
                    projectName: {
                        contains: search,
                        mode: "insensitive",
                    },
                }
            : {};

        const [project, totalCount, statusCounts] = await Promise.all([
            prisma.project.findMany({ where, take: limit, skip ,orderBy: { createdAt : 'desc' } }),
            prisma.project.count({ where }),
            prisma.project.groupBy({
                 where, 
                by: ['projectStatus'],
                _count: {
                    _all: true
                }
            })
        ]);

        const count = {
            PLANNED: 0,
            RUNNING: 0,
            COMPLETED: 0,
        };

        statusCounts.forEach((status) => {
           switch(status.projectStatus){
                case "COMPLETED":
                count.COMPLETED = status._count._all;
                break;
                case "PLANNED":
                count.PLANNED = status._count._all;
                break;
                case "RUNNING":
                count.RUNNING = status._count._all;
                break;
            }
        });

        const totalPages = Math.ceil(totalCount / limit);

        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        return {
            data: project,
            count,
            pagination: {
                page,
                limit,
                totalPages,
                total:totalCount,
                hasNextPage,
                hasPreviousPage
            }
        }
    };

    public async findById(id: string):Promise<ProjectDto | null> {
        const project = await prisma.project.findUnique({ where: { id } });
        return project;
    };
    
    public async deleteById(id: string): Promise<ProjectDto | null> {
        const project = await prisma.project.delete({ where: { id }});
        return project;
    };

    public async updateById(id: string, data: UpdateProject): Promise<ProjectDto> {
        const project = await prisma.project.update({ where: {id}, data });
        return project;
    };

    public async fetchProjects(): Promise<{projectName:string, id: string}[]>{
        const project = await prisma.project.findMany({ select: {
            id: true,
            projectName: true,
        } });
        return project;
    }
}