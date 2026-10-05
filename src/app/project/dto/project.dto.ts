import { ProjectStatus } from "../../../generated/prisma/client";
export class ProjectDto {
    public projectName : string
    public description : string
    public projectStatus : ProjectStatus
    public startDate  :Date
    public endDate: Date
    constructor( data: {
        projectName : string,
        description : string,
        projectStatus : ProjectStatus,
        startDate  :Date,
        endDate: Date
    }
    ){
        this.projectName = data.projectName
        this.description = data.description
        this.projectStatus = data.projectStatus,
        this.startDate = data.startDate
        this.endDate = data.endDate
    }
}