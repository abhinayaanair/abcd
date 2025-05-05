// Main.jsx
import React, { useEffect, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import PortfolioPopup from "./PortfolioPopup/PortfolioPopup";
import AddStocksPopup from "./AddStocksPopup/AddStocksPopup";

const Main = () => {
  const fullText = "WELCOME TO CAUSAILITY AI";
  const [typedText, setTypedText] = useState("");
  const [showPortfolioPopup, setShowPortfolioPopup] = useState(false);
  const [showAddStocksPopup, setShowAddStocksPopup] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    portfolioName: "",
    investmentGoal: "",
    timeframe: "",
    customDates: null,
    stocks: [],
    weights: {},
  });

  const updatePortfolioData = (newData) => {
    setPortfolioData((prev) => ({ ...prev, ...newData }));
  };

  const handleFormSubmit = (data) => {
    updatePortfolioData(data);
    setShowPortfolioPopup(false);
    setShowAddStocksPopup(true);
  };

  const handleStockSelectionComplete = (data) => {
    updatePortfolioData({ stocks: data.stocks, weights: data.weights });

    const payload = {
      ...portfolioData,
      stocks: data.stocks,
      weights: data.weights,
    };

    console.log("Final payload to backend:", payload);

    // Submit to backend
    fetch("/api/portfolio-with-stocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setShowAddStocksPopup(false);
  };

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText((prev) => {
        const nextChar = fullText[index];
        index++;
        if (index >= fullText.length) {
          clearInterval(typingInterval);
        }
        return prev + nextChar;
      });
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="main">
      <div>
        <h1 className="hero-heading">
          {typedText.includes("CAUSAILITY") ? (
            <>
              {typedText.split("CAUSAILITY")[0]}
              <span className="highlighted">CAUSAILITY</span>
              {typedText.split("CAUSAILITY")[1]}
            </>
          ) : (
            typedText
          )}
          <span className="blinking-cursor">|</span>
        </h1>

        <p>Create your first portfolio</p>
        <p>Build, analyze and optimize your stock portfolios with our AI powered engine.</p>
      </div>

      <div>
        <button onClick={() => setShowPortfolioPopup(true)}>Create Portfolio</button>
        {showPortfolioPopup && (
          <PortfolioPopup
            onClose={() => setShowPortfolioPopup(false)}
            onSubmit={handleFormSubmit}
          />
        )}
        {showAddStocksPopup && (
          <AddStocksPopup
            portfolioName={portfolioData.portfolioName}
            onClose={() => setShowAddStocksPopup(false)}
            onSubmit={handleStockSelectionComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
