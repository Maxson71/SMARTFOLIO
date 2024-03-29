import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = await getCurrentUser();

    try {
        if(!user?.email) {
            return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
        }

        const { name } = await req.json();
        const newPortfolio = await prisma.portfolio.create({
            data: {
                name, userEmail: user.email
            }
        })
        return NextResponse.json({newPortfolio}, { status: 200})

    } catch(error) {
        return NextResponse.json({ message: 'Something went wrong!'}, { status: 500 })
    }
}