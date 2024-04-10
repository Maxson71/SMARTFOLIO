import styles from "../portfolio-page.module.scss";
import SidePanel from "@/components/sidepanel/SidePanel";
import {FC} from "react";
import prisma from "@/lib/db";
import colors from "@/constants/colors";
import TransactionForm from "@/components/portfolio/TransactionForm";

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

    if (portfolio?.balance === 0) {
        return (
            <main className={styles.main}>
                <SidePanel/>
                <div className={styles.info}>
                    <TransactionForm/>
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
                            ${portfolio?.balance}
                        </h1>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PortfolioPage;
