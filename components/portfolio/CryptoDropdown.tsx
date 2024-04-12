import React, {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import styles from "./cryptodropdown.module.scss";

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    image: string;
}

const CryptoDropdown = (props) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [tagCrypto, setTagCrypto] = useState<string>('');
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
                const fetchedCryptos = response.data.map((crypto: any) => ({
                    id: crypto.id,
                    name: crypto.name,
                    symbol: crypto.symbol,
                    image: crypto.image,
                }));
                setCryptos(fetchedCryptos);
                console.log('Запит до api');
            } catch (error) {
                console.error('Помилка при отриманні списку криптовалют:', error);
            }
        };

        fetchCryptos();
    }, []);

    const filteredCryptos = cryptos.filter(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setIsOpen(true);
    };

    const handleInputFocus = () => {
        setSearchQuery("");
        setIsOpen(true);
    };

    const handleSelectCrypto = (crypto: Crypto) => {
        if (crypto.name === '') {
            setSearchQuery('');
            setTagCrypto('');
        } else {
            setSearchQuery(crypto.name);
            setTagCrypto(crypto.symbol);
        }
        props.onSelectCrypto(crypto.id, crypto.name, crypto.symbol, crypto.image);
        setIsOpen(false);
    };

    return (
        <div className={styles.crypto_dropdown}>
            {isOpen && (
                <div className={styles.close}
                     onClick={() => handleSelectCrypto({
                            id: '',
                            image: '',
                            name: '',
                            symbol: ''
                     })}>
                </div>
            )
            }
            <input
                type="text"
                placeholder={"Пошук криптовалюти"}
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength={20}
                className={(isOpen || searchQuery == '') ? styles.crypto_search_input : `${styles.crypto_search_input} ${styles.crypto_search_input_active}`}
            />
            {!isOpen && searchQuery !== '' && (
                <img
                    src={filteredCryptos.length > 0 ? filteredCryptos[0].image : ''}
                    alt={tagCrypto}
                    className={styles.current_crypto_icon}
                    onClick={handleInputFocus}
                />
            )}
            {isOpen && (
                <div className={styles.crypto_list}>
                    {filteredCryptos.map(crypto => (
                        <div
                            key={crypto.symbol}
                            className={styles.crypto_item}
                            onClick={() => handleSelectCrypto(crypto)}
                        >
                            <img
                                src={crypto.image}
                                alt={crypto.symbol}
                                className={styles.crypto_icon}
                            />
                            <span className={styles.crypto_name}>{crypto.name}</span>
                            <span className={styles.crypto_symbol}>{(crypto.symbol).toUpperCase()}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CryptoDropdown;
