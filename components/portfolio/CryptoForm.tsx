import React, {ChangeEvent, FormEvent, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import axios from "axios";
import styles from "./cryptoform.module.scss";
import CryptoDropdown from "@/components/portfolio/CryptoDropdown";

interface FormData {
    idCrypto: string;
    nameCrypto: string;
    tagCrypto: string;
    imageCrypto: string;
    amount: number;
    price: number;
    typeTransaction: string;
    date: string;
}
const CryptoForm = () => {
    const [formData, setFormData] = useState<FormData>({
            idCrypto: '',
            nameCrypto: '',
            tagCrypto: '',
            imageCrypto: '',
            amount: 0.00,
            price: 0.00,
            typeTransaction: 'buy',
            date: '',
        }
    );
    const router = useRouter();
    const [activeType, setActiveType] = useState<number>(1);
    const totalSpent = (formData.amount * formData.price).toFixed(2);

    const handleSelectCrypto = async (idCrypto: string, nameCrypto: string, tagCrypto: string, imageCrypto: string) => {

        if (idCrypto !== '') {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${idCrypto}&vs_currencies=usd`);
                const currentPrice = response.data[idCrypto].usd;

                setFormData({
                    ...formData,
                    idCrypto,
                    nameCrypto,
                    tagCrypto,
                    imageCrypto,
                    price: currentPrice,
                });

            } catch (error) {
                console.error(error);
            }
        } else {
            setFormData({
                ...formData,
                idCrypto,
                nameCrypto,
                tagCrypto,
                imageCrypto,
            });
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (formData.idCrypto === '') {
                console.error('Неправильно введено назву криптовалюти');
                return;
            }

            const response = await axios.post('/api/portfolios', formData);
            if (response.status === 200) {
                router.push(`/portfolio/${response.data.newPortfolio.id}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.new_portfolio_form}>
            <CryptoDropdown onSelectCrypto={handleSelectCrypto}/>
            <div className={styles.inputs}>
                <input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    step="any"
                    pattern="\d+(\.\d{1,5})?"
                    className={styles.portfolio_input_name}
                    value={formData.amount}
                    onChange={handleChange}
                    min={0}
                    maxLength={10}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    step={0.00001}
                    className={styles.portfolio_input_name}
                    value={formData.price}
                    onChange={handleChange}
                    min={0}
                    maxLength={10}
                />
            </div>
            <div className={styles.type}>
                <div
                    onClick={() => setActiveType(1)}
                    className={activeType === 1 ? `${styles.active_buy} ${styles.active} ${styles.button}` : `${styles.button} ${styles.button_buy}`}
                >
                    Купівля
                </div>
                <div
                    onClick={() => setActiveType(2)}
                    className={activeType === 2 ? `${styles.active_sell} ${styles.active} ${styles.button}` : `${styles.button} ${styles.button_sell}`}
                >
                    Продаж
                </div>
            </div>
            <p className={styles.total_spent}>{totalSpent}</p>
            <div className={styles.buttons}>
                <button
                    type="submit"
                    className={formData.nameCrypto === '' ? styles.blocked_submit_button : styles.submit_button}
                >
                    Додати {formData.nameCrypto}
                </button>
            </div>
        </form>
    );
}
export default CryptoForm;