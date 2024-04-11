import React, {ChangeEvent, FormEvent, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import axios from "axios";
import styles from "./cryptoform.module.scss";
import CryptoDropdown from "@/components/portfolio/CryptoDropdown";

interface FormData {
    nameCrypto: string;
    tagCrypto: string;
    imageCrypto: string;
    count: number;
    price: number;
    date: string;
}
const CryptoForm = () => {
    const [formData, setFormData] = useState<FormData>({
            nameCrypto: '',
            tagCrypto: '',
            imageCrypto: '',
            count: 0.00,
            price: 0.00,
            date: '',
        }
    );
    const {data} = useSession();
    const router = useRouter();
    const [error, setError] = useState<string>('');

    const handleSelectCrypto = (nameCrypto: string, tagCrypto: string, imageCrypto: string) => {
        setFormData({
            ...formData,
            nameCrypto,
            tagCrypto,
            imageCrypto,
        });
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
            if (error || formData.nameCrypto === '') {
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
            <input
                type="number"
                name="count"
                placeholder="0.00"
                className={styles.portfolio_input_name}
                value={formData.count}
                onChange={handleChange}
                min={0}
                maxLength={10}
            />
            <input
                type="number"
                name="price"
                placeholder="0.00"
                className={styles.portfolio_input_name}
                value={formData.price}
                onChange={handleChange}
                min={0}
                maxLength={10}
            />
            <p className={styles.error_message}>{formData.tagCrypto}</p>
            {error && <p className={styles.error_message}>{error}</p>}
            <div className={styles.buttons}>
                <button
                    type="submit"
                    className={`${error || formData.nameCrypto === '' ? styles.blocked_submit_button : styles.submit_button}`}
                >
                    Додати
                </button>
            </div>
        </form>
    );
}
export default CryptoForm;