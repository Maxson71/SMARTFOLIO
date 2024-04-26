import {getCurrentUser} from "@/lib/session";
import prisma from "@/lib/db";

const TransactionGraph = async ({ portfolioId }) => {
    const user = await getCurrentUser();

    if (!user) {
        return null;
    }

    const cryptoTransactions = await prisma.cryptoTransaction.findMany({
        where: {
            PortfolioId: portfolioId,
            userEmail: user.email,
        }
    });

    return (
        <>
        </>
    );
}

export default TransactionGraph;