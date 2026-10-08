import { tool } from "langchain";
import { prisma } from "../../../db/prisma";

export const getMyTasksTool = tool(
    async () => {
        const tasks = await prisma.task.findMany({
            where: {
                status: {
                    not : "COMPLETED"
                }
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                startDate: true,
                endDate: true,
                projectId: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return JSON.stringify(tasks)
    },
    {
        name: "get_my_tasks",
        description: "Get the current user's incomplete tasks for AI prioritization."
    }
)