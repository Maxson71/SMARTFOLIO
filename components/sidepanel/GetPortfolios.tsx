import prisma from "@/lib/db";
import {getCurrentUser} from "@/lib/session";
import styles from "@/components/sidepanel/sidePanel.module.scss";
import PortfolioCard from "@/components/sidepanel/PortfolioCard";
import Link from "next/link";

const GetPortfolios = async () => {
    const user = await getCurrentUser();

    if (!user) {
        return null;
    }

    const portfolios = await prisma.portfolio.findMany({
        where: {
            userEmail : user.email,
        },
    });

    const getAllBalance = () => {
        let allBalance = 0;
        portfolios.forEach((portfolio) => {
            allBalance += portfolio.balance;
        });
        return allBalance.toFixed(2);
    }

    return (
        <div>
            <Link className={styles.all_balance} href={"/portfolio"}>
                <div>
                    Загалом
                </div>
                <div>
                    ${getAllBalance()}
                </div>
            </Link>
            {portfolios.map((portfolio, index) => (
                <div key={index}>
                    <PortfolioCard id={portfolio.id} name={portfolio.name} balance={portfolio.balance.toFixed(2)}/>
                </div>
            ))}
        </div>
    );
}

export default GetPortfolios;