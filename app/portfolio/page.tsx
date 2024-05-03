import styles from "./portfolio-page.module.scss";
import SidePanel from "@/components/sidepanel/SidePanel";
import {getCurrentUser} from "@/lib/session";
import prisma from "@/lib/db";
import React from "react";
import colors from "@/constants/colors";
import Price from "@/components/price";
import TransactionGraph from "@/components/portfolio/TransactionGraph";
import TransactionRatioPieChart from "@/components/portfolio/TransactionRatioPieChart";


const MainPortfolioPage = async () => {
    const user = await getCurrentUser();
    if (!user) return;

    const portfolios = await prisma.portfolio.findMany({
        where: {
            userEmail: user.email,
        }
    });

    const portfolioAssetsData = await prisma.cryptoTransaction.findMany({
        where: {
            userEmail: user.email,
        },
    });

    const bestTransaction = await prisma.cryptoTransaction.findFirst({
        where: {
            userEmail: user.email,
        },
        orderBy: {
            difference: 'desc',
        },
    });

    const worstTransaction = await prisma.cryptoTransaction.findFirst({
        where: {
            userEmail: user.email,
        },
        orderBy: {
            difference: 'asc',
        },
    });

    const getAllBalance = () => {
        let allBalance = 0;
        portfolios.forEach((portfolio) => {
            allBalance += portfolio.balance;
        });
        return allBalance;
    }

    const getAllDifference = () => {
        let allDifference = 0;
        portfolios.forEach((portfolio) => {
            allDifference += portfolio.difference;
        });
        return allDifference;
    }

    const AllBal = getAllBalance();
    const AllDiff = getAllDifference();

    if (portfolios?.length === 0) {
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
                    Створіть портфель!
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
                            Загалом
                        </h1>
                        <h1>
                            ${(AllBal).toFixed(2)}
                        </h1>
                    </div>
                    <div className={styles.difference}>
                        <div>
                            <Price price={(AllDiff).toFixed(2)} setcolor={true} type={"$"}/>

                            <Price price={((AllDiff / AllBal)*100).toFixed(2)} setcolor={true}
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
                        <div className={styles.name}>
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
                    <div>

                    </div>
                </div>
                <div className={styles.graph}>
                    <TransactionGraph portfolioAssetsData={portfolioAssetsData}/>
                    <TransactionRatioPieChart portfolioAssetsData={portfolioAssetsData} balance={AllBal}/>
                </div>
            </div>
        </main>
    );
}

export default MainPortfolioPage;
