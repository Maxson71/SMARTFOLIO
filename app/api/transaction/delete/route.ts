import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = await getCurrentUser();

    if (!user?.email) {
        return NextResponse.json({ message: "Ви авторизовані!" }, { status: 401 });
    }

    try {
        const { id} = await req.json();

        await prisma.cryptoTransaction.update({
            where: {
                id: id,
            },
            data: {
                balance: 0,
            }
        });

        await prisma.cryptoTransaction.delete({
            where: {
                id: id,
            }
        });

        return NextResponse.json({ message: "Транзакцію видалено успішно!" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}