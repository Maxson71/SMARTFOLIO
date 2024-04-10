import styles from "./portfolio-page.module.scss";
import SidePanel from "@/components/sidepanel/SidePanel";
export default function MainPortfolioPage() {
    return (
        <main className={styles.main}>
            <SidePanel/>
            <div className={styles.info}>
                main
            </div>
        </main>
    );
}
