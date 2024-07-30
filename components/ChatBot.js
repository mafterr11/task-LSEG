"use client";
import { useState, useEffect } from "react";
import { data } from "@/data";

export default function ChatBot() {
  //exchanges = all the stock exchanges mapped in the useEffect on page mount
  //setExchanges in useEffect maps each item in data.js to a code and stockExchange
  const [exchanges, setExchanges] = useState([]);

  //currentExchange = stock exchange selected by user
  const [currentExchange, setCurrentExchange] = useState(null);

  //stocks = top 5 stocks for the selected stock exchange
  const [stocks, setStocks] = useState([]);

  //selectedStock = stock selected by user (only for the right side of the screen display)
  const [selectedStockName, setSelectedStockName] = useState("");

  //stockPrice = price of the selected stock
  const [stockPrice, setStockPrice] = useState("");

  // Displaying the stock exchange options on page load
  useEffect(() => {
    setExchanges(
      data.map((item) => ({
        // Unique ID: item.code
        code: item.code,
        // Name : item.name
        stockExchange: item.stockExchange,
      })),
    );
  }, []);

  // Fetch the stocks available for the selected stock exchange option above
  // Once a stock is selected, fetch its specific price
  //exchangeCode receives the value of exchange.code
  const fetchStocks = (exchangeCode) => {
    const exchange = data.find((item) => item.code === exchangeCode);
    if (exchange) {
      setCurrentExchange(exchange.stockExchange);
      setStocks(exchange.topStocks);
      setStockPrice("");
      setSelectedStockName("");
    }
  };

  // Once a stock is selected, fetch its price and display it on the screen
  const fetchPrice = (stock) => {
    setStockPrice(
      `Stock price of ${stock.stockName} is ${stock.price}. Please select an option.`,
    );
    setSelectedStockName(stock.stockName); // This essentially saves the selected stock name into this different state so I can display it on the right side of the screen properly
  };

  // For the go back button, it resets the states to their initial values
  const resetToMainMenu = () => {
    setStocks([]);
    setStockPrice("");
    setCurrentExchange(null);
    setSelectedStockName("");
  };

  return (
    <div className="h-full w-full pb-20">
      {/* Header section is here */}
      <header className="bg-blue-600 py-4 text-center text-white">
        <h1 className="text-2xl font-bold">LSEG Chatbot</h1>
      </header>
      {/* The main chatbot is container here */}
      <main className="mx-auto mt-6 flex w-[90%] flex-col gap-y-5">
        {/* Initial hello message and the stock exchange selection */}
        <p className="mb-2 max-w-xl rounded-md bg-blue-100 p-4 text-gray-700">
          Hello! Welcome to LSEG. I`m here to help you.
        </p>
        <div className="max-w-xl rounded-lg border border-blue-200 bg-white shadow-lg">
          <div>
            <p className="rounded-t-md bg-blue-100 p-2 pl-4 text-gray-700">
              Please select a Stock Exchange.
            </p>
            {exchanges.map((exchange) => (
              <div
                key={exchange.code}
                className="border-t border-blue-100 transition duration-500 hover:bg-blue-100"
              >
                <button
                  onClick={() => fetchStocks(exchange.code)}
                  className="block w-full py-4 font-medium text-neutral-600 transition duration-300 hover:scale-[1.05]"
                >
                  {exchange.stockExchange}
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Displaying the client's selection to the right side of the screen */}
        {currentExchange && (
          <p className="self-end rounded-md bg-gray-200 p-4">
            {currentExchange}
          </p>
        )}
        {/* This is the window of stock selection, after selecting a stock exchange */}
        {currentExchange && (
          <div className="max-w-xl rounded-lg border border-blue-200 bg-white shadow-lg">
            <div>
              <p className="rounded-t-md bg-blue-100 p-2 pl-4 text-gray-700">
                Please select a stock.
              </p>
              {stocks.map((stock) => (
                <div
                  key={stock.code}
                  className="border-t border-blue-100 transition duration-500 hover:bg-blue-100"
                >
                  <button
                    onClick={() => fetchPrice(stock)}
                    className="block w-full py-4 font-medium text-neutral-600 transition duration-300 hover:scale-[1.05]"
                  >
                    {stock.stockName}
                  </button>
                </div>
              ))}
              <button
                onClick={resetToMainMenu}
                className="mt-4 block w-full rounded-b-md bg-gray-100 p-3 font-semibold text-gray-700 transition duration-300 hover:bg-gray-200"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
        {/* Displaying the client's selection to the right side of the screen */}
        {selectedStockName && (
          <p className="self-end rounded-md bg-gray-200 p-4">
            {selectedStockName}
          </p>
        )}
        {/* This is the window that displays the selected stock's price */}
        {stockPrice && (
          <div className="max-w-xl rounded-lg border border-blue-200 bg-white shadow-lg">
            <div className="text-center text-gray-700">
              <p className="rounded-t-md bg-blue-100 p-2 pl-4 text-gray-700">
                {stockPrice}
              </p>
              <div className="">
                <button
                  onClick={resetToMainMenu}
                  className="block w-full rounded-b-md bg-gray-100 p-3 font-semibold text-gray-700 transition duration-300 hover:bg-gray-200"
                >
                  Main menu
                </button>
                <button
                  onClick={() => setStockPrice("")}
                  className="block w-full rounded-b-md bg-gray-100 p-3 font-semibold text-gray-700 transition duration-300 hover:bg-gray-200"
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
