import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import TransactionCard from "@/components/portfolio/TransactionCard";

const GetTransaction = async ({ portfolioId }) => {
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
        <div>
            {cryptoTransactions.map((groupedTransaction) => {
                const { id, idCrypto, nameCrypto, tagCrypto, imageCrypto, amount, price} = groupedTransaction;
                return (
                    <div key={nameCrypto}>
                        <TransactionCard
                            id={id}
                            idCrypto={idCrypto}
                            tagCrypto={tagCrypto}
                            name={nameCrypto}
                            img={imageCrypto}
                            amount={amount}
                            price={price}
                            portfolioId={portfolioId}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default GetTransaction;
