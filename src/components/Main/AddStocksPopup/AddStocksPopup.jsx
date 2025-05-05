import React, { useState } from "react";
import "./AddStocksPopup.css";
import SetWeightsPopup from "../SetWeightsPopup/SetWeightsPopup";

const dummyStockList = [
  "AAPL", "GOOGL", "MSFT", "AMZN", "TSLA",
  "NVDA", "NFLX", "META", "BABA", "JPM"
];

const AddStocksPopup = ({ onClose, onSubmit, portfolioName }) => {  // <-- accept portfolioName
  const [search, setSearch] = useState("");
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [showWeightsPopup, setShowWeightsPopup] = useState(false);

  const filteredStocks = dummyStockList.filter(
    (stock) =>
      stock.toLowerCase().includes(search.toLowerCase()) &&
      !selectedStocks.includes(stock)
  );

  const addStock = (stock) => {
    if (!selectedStocks.includes(stock)) {
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  const removeStock = (stock) => {
    setSelectedStocks(selectedStocks.filter((s) => s !== stock));
  };

  const handleSetWeights = () => {
    if (selectedStocks.length > 0) {
      setShowWeightsPopup(true);
    }
  };

  const handleWeightsSubmit = (data) => {
    // Combine selected stocks and weights, then send up
    onSubmit({ stocks: selectedStocks, weights: data.weights });
    onClose();
  };

  if (showWeightsPopup) {
    return (
      <SetWeightsPopup
        portfolioName={portfolioName}   // <-- use dynamic portfolio name here
        selectedStocks={selectedStocks}
        onClose={() => setShowWeightsPopup(false)}
        onSubmit={handleWeightsSubmit}
      />
    );
  }

  return (
    <div className="overlay">
      <div className="popup">
        <h2>Select Stocks for "{portfolioName}"</h2> {/* Show name in heading */}

        <input
          type="text"
          className="input"
          placeholder="Search stocks (e.g. AAPL, MSFT)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredStocks.length > 0 && (
          <div className="search-results">
            {filteredStocks.map((stock) => (
              <div key={stock} className="result-item">
                <span>{stock}</span>
                <button onClick={() => addStock(stock)}>Add</button>
              </div>
            ))}
          </div>
        )}

        {selectedStocks.length > 0 && (
          <div className="selected-stocks">
            {selectedStocks.map((stock) => (
              <div key={stock} className="stock-row">
                <span>{stock}</span>
                <button className="remove-btn" onClick={() => removeStock(stock)}>Remove</button>
              </div>
            ))}
          </div>
        )}

        <button
          className="action-button"
          onClick={handleSetWeights}
          disabled={selectedStocks.length === 0}
        >
          Set Weights →
        </button>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default AddStocksPopup;
