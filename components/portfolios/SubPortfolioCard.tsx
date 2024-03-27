import React from "react";
import styles from "./subportfoliocard.module.scss";

const SubPortfoliocard = (props) => {
    return (
        <div className={styles.subportfoliocard}>
            <div className={styles.name}>
                {props.name}
            </div>
            <div className={styles.balance}>
                ${props.balance}
            </div>
        </div>
    );
}

export default SubPortfoliocard;