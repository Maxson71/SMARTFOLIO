"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const TransactionGraph = ({ portfolioAssetsData }) => {
    const [transformedData, setTransformedData] = useState([]);
    const [selectedRange, setSelectedRange] = useState('1year'); // Додано стан для вибраного діапазону

    useEffect(() => {
        const fetchData = async () => {
            try {
                const range = selectedRange === '1year' ? 365 : selectedRange === '3months' ? 90 : 30;
                const priceHistoryPromises = portfolioAssetsData.map(async (asset) => {
                    try {
                        const response = await axios.get(`https://api.coincap.io/v2/assets/${asset.idCrypto.toLowerCase()}/history?interval=d1`);
                        const data = await response.data;
                        return { assetId: asset.idCrypto, assetAmount: asset.amount, history: data.data };
                    } catch (error) {
                        return { assetId: asset.idCrypto, assetAmount: asset.amount, history: [] };
                    }
                });
                const assetHistories = await Promise.all(priceHistoryPromises);

                const transformed = [];
                assetHistories.forEach(({ assetId, assetAmount, history }) => {
                    history.forEach(entry => {
                        const date = new Date(entry.time).toLocaleDateString();
                        const value = parseFloat((entry.priceUsd * assetAmount).toFixed(2));
                        const existingEntry = transformed.find(item => item.date === date);

                        if (!existingEntry) {
                            transformed.push({ date, value });
                        } else {
                            existingEntry.value = (+existingEntry.value + +value).toFixed(2);
                        }
                    });
                });

                const selectedRangeData = transformed.slice(-range);
                setTransformedData(selectedRangeData);

            } catch (error) {
                console.error('Помилка при отриманні даних:', error);
            }

        };

        fetchData();
    }, [selectedRange]);

    const handleRangeChange = (range) => {
        setSelectedRange(range);
    };

    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #999999',
                    padding: '10px' }}>
                    <p>{`$${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            <div style={{
                padding: '10px 20px',
                color: '#999999',
                display: 'flex',
                gap: '10px',
                fontWeight: '600',
            }}>
                <button onClick={() => handleRangeChange('1year')}
                        style={{ color: selectedRange === '1year' ? '#F56B8D' : '#999999' }}
                >365Д</button>
                <button onClick={() => handleRangeChange('3months')}
                        style={{ color: selectedRange === '3months' ? '#F56B8D' : '#999999' }}
                >90Д</button>
                <button onClick={() => handleRangeChange('1month')}
                        style={{ color: selectedRange === '1month' ? '#F56B8D' : '#999999' }}
                >30Д</button>
            </div>
            <div style={{
                height: '300px',
                width: '600px',
            }
            }>
                <LineChart width={600} height={300} data={transformedData}  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis orientation="right" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip content={customTooltip} />
                    <Line type="monotone" dataKey="value" stroke="#F56B8D" strokeWidth={3} dot={false} />
                </LineChart>
            </div>
        </div>
    );
};

export default TransactionGraph;


