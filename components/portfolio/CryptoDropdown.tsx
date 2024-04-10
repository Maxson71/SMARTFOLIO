import { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoDropdown = () => {
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState('');

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100'
                );
                setCryptos(response.data);
            } catch (error) {
                console.error('Error fetching cryptos:', error);
            }
        };

        fetchCryptos();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectChange = (e) => {
        setSelectedCrypto(e.target.value);
    };

    const filteredCryptos = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search cryptocurrency"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <select value={selectedCrypto} onChange={handleSelectChange}>
                <option value="">Select a cryptocurrency</option>
                {filteredCryptos.map((crypto) => (
                    <option key={crypto.id} value={crypto.name}>
                        {crypto.name}
                    </option>
                ))}
            </select>
            {selectedCrypto && (
                <img
                    src={filteredCryptos.find(
                        (c) => c.name.toLowerCase() === selectedCrypto.toLowerCase()
                    ).image}
                    alt={selectedCrypto}
                />
            )}
        </div>
    );
};

export default CryptoDropdown;