import React, { useState } from "react";
import "./PortfolioPopup.css";

const PortfolioPopup = ({ onClose, onSubmit }) => {
  const [portfolioName, setPortfolioName] = useState("");
  const [investmentGoal, setInvestmentGoal] = useState("");
  const [timeframe, setTimeframe] = useState("1 year");
  const [customDates, setCustomDates] = useState({ start: "", end: "" });

  const handleSubmit = () => {
    const data = {
      portfolioName,
      investmentGoal,
      timeframe,
      customDates: timeframe === "Custom" ? customDates : null,
    };
    onSubmit(data); 
    onClose();
  };

  return (
    <div className="overlay">
      <div className="popup">
        <h2>Create new portfolio</h2>

        <input
          type="text"
          placeholder="e.g., My Growth Fund, Retirement Savings"
          className="input"
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
        />

        <select
          className="input"
          value={investmentGoal}
          onChange={(e) => setInvestmentGoal(e.target.value)}
        >
          <option value="">Select Investment Goal</option>
          <option value="Growth">Growth</option>
          <option value="Retirement">Retirement</option>
          <option value="Income">Income</option>
        </select>

        <div className="timeframe">
          {["1 year", "3 years", "5 years", "Custom"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="time"
                value={option}
                checked={timeframe === option}
                onChange={(e) => setTimeframe(e.target.value)}
              />{" "}
              {option}
            </label>
          ))}
          {timeframe === "Custom" && (
            <>
              <input
                type="date"
                className="date"
                onChange={(e) =>
                  setCustomDates({ ...customDates, start: e.target.value })
                }
              />
              <input
                type="date"
                className="date"
                onChange={(e) =>
                  setCustomDates({ ...customDates, end: e.target.value })
                }
              />
            </>
          )}
        </div>

        <button className="action-button" onClick={handleSubmit}>
          Add Stocks →
        </button>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default PortfolioPopup;
