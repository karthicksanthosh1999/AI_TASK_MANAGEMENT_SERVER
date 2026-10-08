import { Request, Response } from "express";
import { AIService } from "./ai.service";
import { APIResponse } from "../../lib/APIResponse";

export class AIController {
    
    constructor(
        private readonly aiService = new AIService()
    ){}

    public aiTaskPrioritization = async(req: Request, res: Response): Promise<void> => {
        const tasks = await this.aiService.aiTasksPrioritization();
        res.json( new APIResponse("AI prioritized successfully", 200, tasks))
    };
}