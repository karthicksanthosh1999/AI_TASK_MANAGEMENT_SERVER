import { createAgent } from "langchain";
import { groqModel } from "../../providers/groq.provider";
import { getMyTasksTool } from "./ai_tools/getMyTasks.tool";
import { taskPriorityPrompt } from "./ai_prompts/taskPriotiy.prompt";
import { TaskPrioritySchema } from "./ai_schema/task-priority-schema";

export class AIService {

    private readonly tools = [ getMyTasksTool ];
    private readonly agent = createAgent({ 
        model: groqModel, 
        tools: this.tools, 
        systemPrompt: taskPriorityPrompt
    });

    public aiTasksPrioritization = async() => {
        const result = await this.agent.invoke({
            messages: [ 
                {
                    role : "human",
                    content: "Prioritize my tasks for today"
                }
             ]
        });
        const finalMessage = result.messages[result.messages.length - 1];

        return {
            answer: finalMessage.content,
        };
    }
}