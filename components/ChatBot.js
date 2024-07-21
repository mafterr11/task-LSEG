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
        setStockPrice(`Stock price of ${stock.stockName} is ${stock.price}. Please select an option.`);
    };

    const resetToMainMenu = () => {
        setStocks([]);
        setStockPrice('');
        setCurrentExchange(null);
    };

    return (
        <div className="h-full w-full pb-20">
            <header className="bg-blue-600 text-white text-center py-4">
                <h1 className="text-2xl font-bold">LSEG Chatbot</h1>
            </header>
            <main className="mt-6 flex flex-col gap-y-5 w-[90%] mx-auto">
                <p className="text-gray-700 mb-2 bg-blue-100 p-4 rounded-md max-w-xl ">Hello! Welcome to LSEG. I`m here to help you.</p>
                <div className="bg-white border border-blue-200 shadow-lg rounded-lg max-w-xl ">
                    <div>
                        <p className="text-gray-700 bg-blue-100 p-2 pl-4 rounded-t-md">Please select a Stock Exchange.</p>
                        {exchanges.map(exchange => (
                            <div key={exchange.code} className='hover:bg-blue-100 border-blue-100 transition duration-500'>
                                <button
                                    onClick={() => fetchStocks(exchange.code)}
                                    className="block hover:scale-[1.05] w-full py-4 border-t  text-neutral-600 font-semibold  transition duration-300"
                                >
                                    {exchange.stockExchange}
                                </button>
                            </div>

                        ))}
                    </div>
                </div>
                {currentExchange && (
                    <p className='self-end p-4 bg-gray-200 rounded-md'>{currentExchange}</p>
                )}
                {currentExchange && (
                    <div className="bg-white border border-blue-200 shadow-lg rounded-lg max-w-xl ">
                        <div>
                            <p className="text-gray-700 bg-blue-100 p-2 pl-4 rounded-t-md">Please select a stock.</p>
                            {stocks.map(stock => (
                                <div key={stock.code} className='hover:bg-blue-100 border-blue-100 transition duration-500'>
                                    <button
                                        onClick={() => fetchPrice(stock)}
                                        className="block hover:scale-[1.05] w-full py-4 border-t  text-neutral-600 font-semibold  transition duration-300"
                                    >
                                        {stock.stockName}
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={resetToMainMenu}
                                className="block w-full p-3 bg-gray-100 text-gray-700 font-semibold rounded-b-md hover:bg-gray-200 transition duration-300 mt-4"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                )}
                {stockPrice && (
                    <p className='self-end p-4 bg-gray-200 rounded-md'>{stockPrice}</p>
                )}
                {stockPrice && (
                    <div className="bg-white border border-blue-200 shadow-lg rounded-lg max-w-xl ">
                        <div className="text-center text-xl text-gray-700 ">
                            <p className='text-gray-700 bg-blue-100 p-2 pl-4 rounded-t-md'>{stockPrice}</p>
                            <div className="">
                                <button
                                    onClick={resetToMainMenu}
                                    className="block w-full p-3 bg-gray-100 text-gray-700 font-semibold rounded-b-md hover:bg-gray-200 transition duration-300"
                                >
                                    Main menu
                                </button>
                                <button
                                    onClick={() => setStockPrice('')}
                                    className="block w-full p-3 bg-gray-100 text-gray-700 font-semibold rounded-b-md hover:bg-gray-200 transition duration-300"
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
