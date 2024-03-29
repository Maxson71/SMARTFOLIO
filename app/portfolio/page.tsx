"use client";
import styles from "./portfolio-page.module.scss";
import PortfolioCard from "@/components/portfolios/PortfolioCard";
import SubPortfolioCard from "@/components/portfolios/SubPortfolioCard";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {NewPortfolio} from "@/components/NewPortfolio";
import {getCurrentUser} from "@/lib/session";
import SidePanel from "@/components/portfolios/SidePanel";

export default function PortfolioPage() {
    const [showModal, setShowModal] = useState(false);

    const handleAddPortfolio = () => {
        setShowModal(true);
    };

    return (
        <main className={styles.main}>
            <SidePanel />
        </main>
    );
}
