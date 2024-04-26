import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = await getCurrentUser();

    if (!user?.email) {
        return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });
    }

    try {
        const { portfolioId } = await req.json();

        await prisma.portfolio.delete(
            {
                where: {
                    id: portfolioId,
                    userEmail: user.email,
                },
            }
        )

        return NextResponse.json({ message: "Good" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}