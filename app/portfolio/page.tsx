import styles from "./portfolio-page.module.scss";
import SidePanel from "@/components/sidepanel/SidePanel";


const MainPortfolioPage = async () => {
    return (
        <main className={styles.main}>
            <SidePanel/>
            <div className={styles.info}>
                main
            </div>
        </main>
    );
}

export default MainPortfolioPage;
