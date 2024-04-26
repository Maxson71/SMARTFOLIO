import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = await getCurrentUser();

    if (!user?.email) {
        return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });
    }

    try {
        const { id, idCrypto, portfolioId, balance, difference, currentPrice } = await req.json();

        if (typeof idCrypto !== 'string' || typeof balance !== 'number' || typeof difference !== 'number' || typeof currentPrice !== 'number') {
            return NextResponse.json({ error: "Wrong type" }, { status: 500 });
        }
        await prisma.cryptoTransaction.update(
            {
                where: {
                    id: id,
                    userEmail: user.email,
                    PortfolioId: portfolioId,
                },
                data: {
                    balance: balance,
                    difference: difference,
                    currentPrice: currentPrice,
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