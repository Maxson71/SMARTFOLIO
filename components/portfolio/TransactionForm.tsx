"use client"
import React, {useState} from "react";
import CustomModal from "@/components/CustomModal";
import styles from "./transactionform.module.scss";
import CryptoForm from "@/components/portfolio/transaction/CryptoForm";
import {AiOutlinePlus} from "react-icons/ai";



const TransactionForm = ({portfolioId}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [activeType, setActiveType] = useState(1);

    return (
        <div>
            <CustomModal active={modalIsOpen} setActive={setModalIsOpen} title={"Додати актив"}>

                <div className={styles.type}>
                    <button
                        onClick={() => setActiveType(1)}
                        className={activeType === 1 ? `${styles.active} ${styles.button}` : styles.button}
                    >
                        Криптовалюта
                    </button>
                    <button
                        onClick={() => setActiveType(2)}
                        className={activeType === 2 ? `${styles.active} ${styles.button}` : styles.button}
                    >
                        Акції
                    </button>
                    <button
                        onClick={() => setActiveType(3)}
                        className={activeType === 3 ? `${styles.active} ${styles.button}` : styles.button}
                    >
                        Фіат
                    </button>
                </div>

                { activeType === 1 && <CryptoForm setActive={setModalIsOpen} portfolioId = {portfolioId} /> }
                { activeType === 2 && <p> В майбутньому </p> }
                { activeType === 3 && <p> В майбутньому </p> }

            </CustomModal>
            <button className={styles.button_add} onClick={() => setModalIsOpen(true)}>
                <AiOutlinePlus
                    size={20}
                />
                Додати актив
            </button>
        </div>
    );
}

export default TransactionForm;