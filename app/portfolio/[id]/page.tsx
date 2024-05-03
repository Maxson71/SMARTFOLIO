import styles from "../portfolio-page.module.scss";
import SidePanel from "@/components/sidepanel/SidePanel";
import React, {FC} from "react";
import prisma from "@/lib/db";
import colors from "@/constants/colors";
import TransactionForm from "@/components/portfolio/TransactionForm";
import GetTransaction from "@/components/portfolio/GetTransaction";
import TransactionGraph from "@/components/portfolio/TransactionGraph";
import Price from "@/components/price";
import {getCurrentUser} from "@/lib/session";
import TransactionRatioPieChart from "@/components/portfolio/TransactionRatioPieChart";

interface PortfolioPageProps {
    params: {
        id: string;
    }; 
}

const PortfolioPage: FC<PortfolioPageProps> = async ({params}) => {
    const user = await getCurrentUser();
    if (!user) return;

    const portfolio = await prisma.portfolio.findFirst({
        where: {
            id: params.id,
            userEmail: user.email,
        }
    });

    const portfolioAssetsData = await prisma.cryptoTransaction.findMany({
        where: {
            PortfolioId: params.id,
            userEmail: user.email,
        },
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
                        <div>
                            <Price price={(portfolio?.difference).toFixed(2)} setcolor={true} type={"$"}/>

                            <Price price={((portfolio?.difference / portfolio?.balance)*100).toFixed(2)} setcolor={true}
                                   type={"%"}/>
                        </div>
                    </div>
                    <div className={styles.transaction}>
                        <div>
                            Найкраща транзакція
                        </div>
                        <div className={styles.name}>
                            <img
                                src={bestTransaction?.imageCrypto}
                                alt={bestTransaction?.tagCrypto}
                                width={30}
                                height={30}
                                style={
                                    {
                                        borderRadius: "50%",
                                    }
                                }
                            />
                            <div>
                                {bestTransaction?.nameCrypto}
                            </div>
                        </div>
                        <div>
                            <Price price={bestTransaction?.difference.toFixed(2)} setcolor={true} type={"$"}/>
                            <Price price={((bestTransaction?.difference / bestTransaction?.price) * 100).toFixed(2)}
                                   setcolor={true} type={"%"}/>
                        </div>
                    </div>
                    <div className={styles.transaction}>
                        <div>
                            Найгірша транзакція
                        </div>
                        <div>
                            <img
                                src={worstTransaction?.imageCrypto}
                                alt={worstTransaction?.tagCrypto}
                                width={30}
                                height={30}
                                style={
                                    {
                                        borderRadius: "50%",
                                    }
                                }
                            />
                            <div>
                                {worstTransaction?.nameCrypto}
                            </div>
                        </div>
                        <div>
                            <Price price={worstTransaction?.difference.toFixed(2)} setcolor={true} type={"$"}/>
                            <Price price={((worstTransaction?.difference / worstTransaction?.price) * 100).toFixed(2)}
                                   setcolor={true} type={"%"}/>
                        </div>
                    </div>
                    <TransactionForm portfolioId={params.id}/>
                </div>
                <div className={styles.graph}>
                    <TransactionGraph portfolioAssetsData={portfolioAssetsData}/>
                    <TransactionRatioPieChart portfolioAssetsData={portfolioAssetsData} balance={portfolio?.balance}/>
                </div>
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
