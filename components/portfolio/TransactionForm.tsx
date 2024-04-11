"use client"
import React, {useState} from "react";
import CustomModal from "@/components/CustomModal";
import styles from "./transactionform.module.scss";
import CryptoForm from "@/components/portfolio/CryptoForm";



const TransactionForm = () => {
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

                { activeType === 1 && <CryptoForm/> }
                { activeType === 2 && <p> Акції </p> }
                {activeType === 3 && <p> Фіат </p>}

            </CustomModal>
            <button onClick={() => setModalIsOpen(true)}>Додати актив</button>
        </div>
    );
}

export default TransactionForm;