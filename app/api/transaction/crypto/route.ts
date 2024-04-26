import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = await getCurrentUser();

    try {
        if(!user?.email) {
            return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
        }

        const {portfolioId, formData} = await req.json();

        let amount = formData.amount;

        const CryptoTransaction = await prisma.cryptoTransaction.findFirst({
            where: {
                PortfolioId: portfolioId,
                userEmail: user.email,
                idCrypto: formData.idCrypto
            }
        });

        if (formData.typeTransaction === 'sell') {
            amount = -amount;
        }

        if (CryptoTransaction) {
            let price = (CryptoTransaction.price*CryptoTransaction.amount + amount*formData.price)/(CryptoTransaction.amount + amount);
            amount = CryptoTransaction.amount + amount;

            if (formData.typeTransaction === 'sell') {
                price = CryptoTransaction.price;
            }

            await prisma.cryptoTransaction.update({
                where: {
                    PortfolioId: portfolioId,
                    userEmail: user.email,
                    id: CryptoTransaction.id
                },
                data: {
                    idCrypto: formData.idCrypto,
                    nameCrypto: formData.nameCrypto,
                    tagCrypto: formData.tagCrypto,
                    imageCrypto: formData.imageCrypto,
                    amount: amount,
                    price: price,
                    date: formData.date,
                    balance: amount*formData.currentPrice,
                    difference: amount*(formData.currentPrice - price),
                    currentPrice: formData.currentPrice
                }
            });

        }
        else {
            await prisma.cryptoTransaction.create({
                data: {
                    idCrypto: formData.idCrypto,
                    nameCrypto: formData.nameCrypto,
                    tagCrypto: formData.tagCrypto,
                    imageCrypto: formData.imageCrypto,
                    amount: amount,
                    price: formData.price,
                    date: formData.date,
                    balance: amount*formData.price,
                    difference: amount*formData.currentPrice - amount*formData.price,
                    currentPrice: formData.currentPrice,

                    PortfolioId: portfolioId,
                    userEmail: user.email,
                }
            });
        }
        return NextResponse.json({ message: "Good"}, { status: 200 });

    } catch(error) {
        return NextResponse.json({ message: error}, { status: 500 })
    }
}