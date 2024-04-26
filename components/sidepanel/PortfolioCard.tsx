import React from "react";
import styles from "./portfoliocard.module.scss";
import Link from "next/link";

const PortfolioCard = (props) => {

    return (
        <Link className={styles.portfoliocard} href={`/portfolio/${props.id}`}>
            <div>
                {props.name}
            </div>
            <div>
                ${props.balance}
            </div>
        </Link>
    );
}

export default PortfolioCard;