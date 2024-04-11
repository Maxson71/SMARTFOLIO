import React from 'react';
import styles from './custommodal.module.scss';
import { IoMdClose } from "react-icons/io";
import colors from "@/constants/colors";

const CustomModal = ({ active, setActive, title, children }) => {
    return (
        <div
            className={active ? `${styles.modal} ${styles.modal_active}` : styles.modal}
            onClick={() => setActive(false)}
        >
            <div
                className={styles.modal_content}
                onClick={e => e.stopPropagation()}
            >
                <div className={styles.top}>
                    <h1 className={styles.title}>{title}</h1>
                    <button onClick={() => setActive(false)}>
                        <IoMdClose
                            style={{color: colors.lightColor}}
                            size={24}
                        />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;