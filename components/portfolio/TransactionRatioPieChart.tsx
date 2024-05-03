"use client"
import React, { useEffect, useState } from 'react';
import styles from './transactionratiopiechart.module.scss';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const TransactionRatioPieChart = ({ portfolioAssetsData , balance }) => {
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const calculateCryptoData = () => {
            const updatedCryptoData = portfolioAssetsData.map(asset => ({
                name: asset.idCrypto,
                tag: asset.tagCrypto,
                image: asset.imageCrypto,
                percentage: parseFloat(((asset.amount * asset.currentPrice) / balance * 100).toFixed(2)),
                value: parseFloat((asset.amount * asset.currentPrice).toFixed(2))
            }));
            updatedCryptoData.sort((a, b) => b.value - a.value);
            setCryptoData(updatedCryptoData);
        };

        calculateCryptoData();
    }, [portfolioAssetsData]);

    const COLORS = ['#F56B8D', '#17a2b8', '#ffc107', '#128C76', '#CA3D3D', '#0088FE', '#00C49F', '#FF8042'];

    const customTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #999999',
                    padding: '10px' }}>
                    <p>{`${payload[0].name}: $${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={styles.piechart}>
            <PieChart width={300} height={300}>
                <Pie
                    data={cryptoData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={90}
                    paddingAngle={3}
                    fill="#8884d8"
                >
                    {
                        cryptoData.map((entry, index) => <Cell key={`cell-${index}`}
                                                               fill={COLORS[index % COLORS.length]}/>)
                    }
                </Pie>
                <Tooltip content={customTooltip}/>
            </PieChart>
            <div className={styles.percentage}>
                <h2>Розподіл</h2>
                {cryptoData.map((crypto, index) => (
                    <div key={index} className={styles.percentage_list}>
                            <img className={styles.percentage} src={crypto.image} alt={crypto.tagCrypto}
                                 style={{width: '20px', height: '20px', borderRadius: '10px'}}/>
                            <div>{crypto.tag.toUpperCase()}</div>
                            <div>{crypto.percentage}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionRatioPieChart;
