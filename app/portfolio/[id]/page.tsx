import styles from "../portfolio-page.module.scss";
import SidePanel from "@/components/sidepanel/SidePanel";
import React, {FC} from "react";
import prisma from "@/lib/db";
import colors from "@/constants/colors";
import TransactionForm from "@/components/portfolio/TransactionForm";
import GetTransaction from "@/components/portfolio/GetTransaction";
import TransactionGraph from "@/components/portfolio/TransactionGraph";
import Price from "@/components/price";

interface PortfolioPageProps {
    params: {
        id: string;
    };
}

const PortfolioPage: FC<PortfolioPageProps> = async ({params}) => {
    const portfolio = await prisma.portfolio.findFirst({
        where: {
            id: params.id,
        }
    });

    const bestTransaction = await prisma.cryptoTransaction.findFirst({
        where: {
            PortfolioId: params.id,
        },
        orderBy: {
            difference: 'desc',
        },
    });

    const worstTransaction = await prisma.cryptoTransaction.findFirst({
        where: {
            PortfolioId: params.id,
        },
        orderBy: {
            difference: 'asc',
        },
    });

    if (portfolio?.balance === 0) {
        return (
            <main className={styles.main}>
                <SidePanel/>
                <div className={styles.info}
                    style={
                        {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }
                    }
                >
                    <TransactionForm portfolioId = {params.id}/>
                    <GetTransaction portfolioId = {params.id}/>
                </div>
            </main>
        );
    }
    return (
        <main className={styles.main}>
            <SidePanel/>
            <div className={styles.info}>
                <div className={styles.top}>
                    <div className={styles.name_balance}
                         style={{color: colors.darkColor}}
                    >
                        <h1>
                            {portfolio?.name}
                        </h1>
                        <h1>
                            ${(portfolio?.balance).toFixed(2)}
                        </h1>
                    </div>
                    <div className={styles.difference}>
                        <Price price={(portfolio?.difference).toFixed(2)} setcolor={true} type={"$"}/>

                        <Price price={((portfolio?.difference / portfolio?.balance)).toFixed(2)} setcolor={true}
                               type={"%"}/>
                    </div>
                    <div className={styles.best_transaction}>
                        <h1>
                            Найкраща транзакція
                        </h1>
                        <div className={styles.name}>
                            <img
                                src={bestTransaction?.imageCrypto}
                                alt={bestTransaction?.tagCrypto}
                                width={20}
                                height={20}
                            />
                            <div>
                                {bestTransaction?.nameCrypto}
                            </div>
                        </div>
                        <h1>
                            <Price price={bestTransaction?.difference.toFixed(2)} setcolor={true} type={"$"}/>
                        </h1>
                        <h1>
                            <Price price={((bestTransaction?.difference / bestTransaction?.price) * 100).toFixed(2)}
                                   setcolor={true} type={"%"}/>
                        </h1>
                    </div>
                    <div className={styles.best_transaction}>
                        <h1>
                            Найгірша транзакція
                        </h1>
                        <div className={styles.name}>
                            <img
                                src={worstTransaction?.imageCrypto}
                                alt={worstTransaction?.tagCrypto}
                                width={20}
                                height={20}
                            />
                            <div>
                                {worstTransaction?.nameCrypto}
                            </div>
                        </div>
                        <h1>
                            <Price price={worstTransaction?.difference.toFixed(2)} setcolor={true} type={"$"}/>
                        </h1>
                        <h1>
                            <Price price={((worstTransaction?.difference / worstTransaction?.price) * 100).toFixed(2)}
                                   setcolor={true} type={"%"}/>
                        </h1>
                    </div>
                    <TransactionForm portfolioId={params.id}/>
                </div>
                <TransactionGraph portfolioId={params.id}/>
                <div>
                <div className={styles.card_title}>
                        <div>
                            Назва
                        </div>
                        <div>
                            Актив
                        </div>
                        <div>
                            Актив ($)
                        </div>
                        <div>
                            Ціна
                        </div>
                        <div>
                            Ціна купівлі
                        </div>
                        <div>
                            Різниця ($)
                        </div>
                        <div>
                            Різниця (%)
                        </div>
                        <div>

                        </div>
                    </div>
                    <GetTransaction portfolioId={params.id}/>
                </div>
            </div>
        </main>
    );
};

export default PortfolioPage;
