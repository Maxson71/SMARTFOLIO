"use client";
import styles from "./sidePanel.module.scss";
import PortfolioCard from "@/components/portfolios/PortfolioCard";
import SubPortfolioCard from "@/components/portfolios/SubPortfolioCard"
import {NewPortfolio} from "@/components/NewPortfolio";

const profiles = [
    {
        name: "ByBit",
        balance: 1000,
        sub_profiles: [
            {
                name: "ByBit 1",
                balance: 500
            },
            {
                name: "ByBit 2",
                balance: 500
            }
        ]
    },
    {
        name: "Binance",
        balance: 2000,
        sub_profiles: [
        ]
    },
    {
        name: "Акції",
        balance: 3000,
        sub_profiles: [
            {
                name: "1 потрфель",
                balance: 500
            },
            {
                name: "2 потрфель",
                balance: 500
            }
        ]
    }
];

export default function SidePanel() {

    return (
        <>
            <div className={styles.portfolios}>
                <div className={styles.scroll_portfolios}>
                    <div className={styles.all_balance}>
                        <div>
                            Загалом
                        </div>
                        <div>
                            $5000
                        </div>
                    </div>
                    {profiles.map((profile, index) => (
                        <div key={index}>
                            <PortfolioCard name={profile.name} balance={profile.balance}/>
                            <div className={styles.sub_portfolios}>
                                {profile.sub_profiles.map((subProfile, subIndex) => (
                                    <SubPortfolioCard
                                        key={subIndex}
                                        name={subProfile.name}
                                        balance={subProfile.balance}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                    <NewPortfolio/>
                </div>
            </div>
            <div className={styles.info}>
                info
            </div>
        </>
    );
}
