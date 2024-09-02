import {NextResponse, NextRequest} from "next/server";
import {prisma} from "@/utils/auth";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const params = Object.fromEntries(query);

    if (params.id) {
        const user = await prisma.user.findUnique({
            where: {
                id: params.id
            }
        });

        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
    }

    if (params.ownerMail) {
        const project = await prisma.project.findMany({
            where: {
                ownerMail: params.userId
            }
        });

        if (!project) {
            return NextResponse.json({error: "Project not found"}, {status: 404});
        }

        return NextResponse.json(project, {status: 200});
    }

    if (params.phaseId) {
        const phase = await prisma.phase.findUnique({
            where: {
                id: params.phaseId
            }
        });

        if (!phase) {
            return NextResponse.json({error: "Phase not found"}, {status: 404});
        }

        return NextResponse.json(phase, {status: 200});
    }

    if (params.projectId) {
        const tasks = await prisma.task.findMany({
            where: {
                projectId: params.projectId
            }
        });

        if (!tasks) {
            return NextResponse.json({error: "Task not found"}, {status: 404});
        }

        return NextResponse.json(tasks, {status: 200});
    }
}