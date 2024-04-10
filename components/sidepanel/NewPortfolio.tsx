"use client";
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import axios from 'axios';
import Colors from "@/constants/colors";
import styles from "./newportfolio.module.scss";

interface FormData {
    name: string;
}

export const NewPortfolio = ()  => {
    const [formData, setFormData] = useState<FormData>({
            name: '',
        }
    );
    const {data} = useSession();
    const router = useRouter();
    const [error, setError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target

        if (value.length < 3 && value.length > 0) {
            setError('Назва повинна бути більше 3 літер');
        } else if (!/^[a-zA-Z0-9а-яА-ЯґҐєЄіІїЇ$€ ]*$/.test(value)) {
            setError('Назва портфелю не може містити спеціальні символи');
        } else {
            setError('');
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (error || formData.name === '') {
                console.error('Неправильно введено назву портфелю');
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

    const [showModal, setShowModal] = useState(false);

    const cancelAddPortfolio = () => {
        handleAddPortfolio();
        setError('');
        setFormData({
            name: ''
        });
    }

    const handleAddPortfolio = () => {
        setShowModal(showModal => !showModal);
    };

    return (

        showModal ?
            <form onSubmit={handleSubmit} className={styles.new_portfolio_form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Введіть назву портфелю"
                    maxLength={20}
                    className={styles.portfolio_input_name}
                    value={formData.name}
                    onChange={handleChange}
                />
                {error && <p className={styles.error_message}>{error}</p>}
                <div className={styles.buttons}>
                    <button
                        type="submit"
                        className={`${error || formData.name === '' ? styles.blocked_submit_button : styles.submit_button}`}
                    >
                        Додати
                    </button>
                    <button
                        type="button"
                        className={styles.cancel_button}
                        onClick={cancelAddPortfolio}
                    >
                        Відмінити
                    </button>
                </div>
            </form>
            :
            <button className={styles.add_portfolios} onClick={handleAddPortfolio}>
                Створити новий портфель
            </button>
    );
};