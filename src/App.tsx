import React, { useState } from "react";
import { Calculator, Sun, Moon } from "lucide-react";

// Constants for Solana rent calculation
const LAMPORTS_PER_SOL = 1000000000;
const RENT_EXEMPTION_THRESHOLD = 2 * 365 * 24 * 60 * 60; // 2 years in seconds
const RENT_PER_BYTE_YEAR = 3480; // lamports
const ACCOUNT_STORAGE_OVERHEAD = 128; // bytes

function calculateRentExemptionThreshold(dataSize: number): number {
  const accountSize = dataSize + ACCOUNT_STORAGE_OVERHEAD;
  const rentPerYear = RENT_PER_BYTE_YEAR * accountSize;
  return Math.ceil(
    (rentPerYear * RENT_EXEMPTION_THRESHOLD) / (365 * 24 * 60 * 60)
  );
}

function App() {
  const [dataSize, setDataSize] = useState<string>("");
  const [rentExempt, setRentExempt] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const calculateRent = () => {
    const size = parseInt(dataSize, 10);
    if (!isNaN(size)) {
      const minBalance = calculateRentExemptionThreshold(size);
      setRentExempt(minBalance / LAMPORTS_PER_SOL);
    } else {
      setRentExempt(null);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setDataSize(value);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        isDarkMode ? "dark bg-gray-900" : "bg-gradient"
      }`}
    >
      <div className="card p-8 w-full max-w-md mx-4 transition-all duration-500">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Calculator className="w-8 h-8 mr-2 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Solana Rent
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="mb-6">
          <label
            htmlFor="dataSize"
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
          >
            Account Data Size (bytes):
          </label>
          <input
            type="text"
            id="dataSize"
            value={dataSize}
            onChange={handleInputChange}
            className="input-field w-full px-4 py-2 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            inputMode="numeric"
            pattern="\d*"
          />
        </div>
        <button
          onClick={calculateRent}
          className="btn-primary w-full py-2 px-4 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        >
          Calculate Rent
        </button>
        {rentExempt !== null && (
          <div className="mt-6 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-all duration-300">
            <p className="font-semibold text-indigo-600 dark:text-indigo-400">
              Rent-exempt minimum: {rentExempt.toFixed(8)} SOL
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
