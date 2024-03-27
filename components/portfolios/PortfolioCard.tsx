import React from "react";
import styles from "./portfoliocard.module.scss";

const PortfolioCard = (props) => {
    return (
        <div className={styles.portfoliocard}>
            <div>
                {props.name}
            </div>
            <div>
                ${props.balance}
            </div>
        </div>
    );
}

export default PortfolioCard;