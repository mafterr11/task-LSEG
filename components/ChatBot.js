"use client"
import { useState, useEffect } from 'react';
import { data } from '@/data';

export default function ChatBot() {
    const [exchanges, setExchanges] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [stockPrice, setStockPrice] = useState('');
    const [currentExchange, setCurrentExchange] = useState(null);

    useEffect(() => {
        setExchanges(data.map(item => ({
            code: item.code,
            stockExchange: item.stockExchange,
        })));
    }, []);

    const fetchStocks = (exchangeCode) => {
        const exchange = data.find(item => item.code === exchangeCode);
        if (exchange) {
            setCurrentExchange(exchange.stockExchange);
            setStocks(exchange.topStocks);
            setStockPrice('');
        }
    };

    const fetchPrice = (stock) => {
        setStockPrice(`The price of ${stock.stockName} is ${stock.price}`);
    };

    const resetToMainMenu = () => {
        setStocks([]);
        setStockPrice('');
        setCurrentExchange(null);
    };

    return (
        <div className=" bg-gray-100">
            <header className="bg-blue-600 text-white text-center py-4">
                <h1 className="text-2xl font-bold">LSEG Chatbot</h1>
            </header>
            <main className="max-w-3xl mx-auto mt-6">
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    {!currentExchange && (
                        <div id="exchange-menu" className="space-y-3">
                            <p className="text-gray-700 mb-4">Hello! Welcome to LSEG. I`m here to help you.</p>
                            <p className="text-gray-700 mb-2">Please select a Stock Exchange.</p>
                            {exchanges.map(exchange => (
                                <button
                                    key={exchange.code}
                                    onClick={() => fetchStocks(exchange.code)}
                                    className="block w-full p-3 bg-blue-100 text-blue-700 font-semibold rounded hover:bg-blue-200 transition duration-300"
                                >
                                    {exchange.stockExchange}
                                </button>
                            ))}
                        </div>
                    )}
                    {currentExchange && !stockPrice && (
                        <div id="stock-menu" className="space-y-3">
                            <p className="text-gray-700 mb-2">Please select a stock.</p>
                            {stocks.map(stock => (
                                <button
                                    key={stock.code}
                                    onClick={() => fetchPrice(stock)}
                                    className="block w-full p-3 bg-green-100 text-green-700 font-semibold rounded hover:bg-green-200 transition duration-300"
                                >
                                    {stock.stockName}
                                </button>
                            ))}
                            <button
                                onClick={resetToMainMenu}
                                className="block w-full p-3 bg-gray-100 text-gray-700 font-semibold rounded hover:bg-gray-200 transition duration-300 mt-4"
                            >
                                Go Back
                            </button>
                        </div>
                    )}
                    {stockPrice && (
                        <div id="stock-price" className="text-center text-xl text-gray-700 mt-4">
                            <p>{stockPrice}</p>
                            <div className="space-y-3 mt-4">
                                <button
                                    onClick={resetToMainMenu}
                                    className="block w-full p-3 bg-gray-100 text-gray-700 font-semibold rounded hover:bg-gray-200 transition duration-300"
                                >
                                    Main menu
                                </button>
                                <button
                                    onClick={() => setStockPrice('')}
                                    className="block w-full p-3 bg-gray-100 text-gray-700 font-semibold rounded hover:bg-gray-200 transition duration-300"
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
