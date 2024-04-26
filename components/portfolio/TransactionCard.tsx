"use client"
import React, {useEffect, useState} from "react";
import styles from "./transactioncard.module.scss";
import Link from "next/link";
import axios from "axios";
import { BiSolidTrashAlt } from "react-icons/bi";
import colors from "@/constants/colors";
import {useRouter} from "next/navigation";
import Price from "@/components/price";


const TransactionCard = ({id, idCrypto, tagCrypto, name, img, amount, price, portfolioId}) => {
    const [currentPrice, setCurrentPrice] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.coincap.io/v2/assets/${idCrypto}`);
                setCurrentPrice(parseFloat(response.data.data.priceUsd));
            } catch (error) {
                try {
                    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${idCrypto}&vs_currencies=usd`);
                    setCurrentPrice(parseFloat(response.data[idCrypto].usd));
                } catch (error) {
                    console.error(error);
                }
            }
        };
        if (currentPrice === null) {
            fetchData();
        }
    }, [idCrypto]);

    useEffect(() => {
        const update = async () => {
            if (currentPrice !== null) {
                try {
                    await axios.post('/api/transaction/update', {
                        id: id,
                        idCrypto: idCrypto,
                        portfolioId: portfolioId,
                        balance: amount*currentPrice,
                        difference: amount*(currentPrice - price),
                        currentPrice: currentPrice,
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        };
        update();
    }, [currentPrice]);

    return (
        <div className={styles.transaction_card}>
            <div className={styles.name}>
                <img src={img} alt={name} className={styles.image}/>
                <div>
                    {name}
                </div>
            </div>
            <Price price={currentPrice?(amount * currentPrice).toFixed(2): "---"} type={"$"} setcolor={false}/>
            <div>
                {(amount).toFixed(2)} {tagCrypto.toUpperCase()}
            </div>
            <Price price={currentPrice?(currentPrice).toFixed(2): "---"} type={"$"} setcolor={false}/>
            <Price price={(price).toFixed(2)} type={"$"} setcolor={false}/>
            <Price price={currentPrice?(amount * currentPrice - amount * price).toFixed(2): "---"} type={"$"} setcolor={true}/>
            <Price price={currentPrice?(((currentPrice) / (price) - 1) * 100).toFixed(2): "---"} type={"%"} setcolor={true}/>
            <BiSolidTrashAlt
                size = {20}
                color = {colors.lightColor}
                style={{ cursor: 'pointer' }}
                onClick={
                async () => {
                    try {
                        await axios.post('/api/transaction/delete',
                            {
                                id: id,
                                portfolioId: portfolioId,
                            }
                        );
                        router.refresh()
                    } catch (error) {
                        console.error(error);
                    }
                }}
            />
        </div>
    );
}

export default TransactionCard;