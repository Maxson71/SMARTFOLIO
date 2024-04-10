import React from 'react';
import styles from './custommodal.module.scss';

const CustomModal = ({ active, setActive, children }) => {
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
                    <button onClick={() => setActive(false)}>Close Modal</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;