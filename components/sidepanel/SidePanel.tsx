import styles from "./sidePanel.module.scss";
import {NewPortfolio} from "@/components/sidepanel/NewPortfolio";
import GetPortfolios from "@/components/sidepanel/GetPortfolios";

export default function SidePanel() {

    return (
        <div className={styles.portfolios}>
            <div className={styles.scroll_portfolios}>
                <GetPortfolios/>
                <NewPortfolio/>
            </div>
        </div>
    );
}
