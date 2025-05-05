import React, { useState, useEffect } from "react";
import "./SetWeightsPopup.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import AnalyzingPopup from "../AnalyzingPopup/AnalyzingPopup"; 
import AnalysisCompletePopup from "../AnalysisCompletePopup/AnalysisCompletePopup";

const SetWeightsPopup = ({ portfolioName, selectedStocks, onClose, onSubmit }) => {
  // Initialize weights with default value 0 for each stock
  const [weights, setWeights] = useState(() => {
    const initWeights = {};
    selectedStocks.forEach(stock => {
      initWeights[stock] = 0; // Ensure no undefined value here
    });
    return initWeights;
  });

  const [totalWeight, setTotalWeight] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);

  useEffect(() => {
    const total = Object.values(weights).reduce((acc, val) => acc + Number(val), 0);
    setTotalWeight(total);
  }, [weights]);

  const handleWeightChange = (stock, value) => {
    const newValue = Math.max(0, Math.min(100, Number(value)));  
    setWeights({ ...weights, [stock]: newValue });
  };

  const handleSubmit = () => {
    if (totalWeight === 100) {
      setIsAnalyzing(true);
      console.log("Started Analyzing...");

      // First show analyzing for 3 sec
      setTimeout(() => {
        setIsAnalyzing(false);
        setIsAnalysisComplete(true);
        console.log("Analysis Completed!");
      }, 3000);  

      // Then show "analysis complete" for 2 sec
      setTimeout(() => {
        console.log("Submitting weights...");
        onSubmit({ weights });
        setIsAnalysisComplete(false);
        onClose();
      }, 3000 + 2000);  // total 5 sec
    } else {
      console.log("Total weight is not 100%, unable to submit.");
    }
  };

  // Prepare data for the bar chart
  const chartData = selectedStocks.map(stock => ({
    stock,
    weight: weights[stock] || 0
  }));

  return (
    <>
      <div className="overlay">
        <div className="popup weight-popup">
          <h2>Set weightages for “{portfolioName}”</h2>

          <div className="chart-container" style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stock" />
                <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="weight" fill="#00C49F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="total-weight">
            <span>Total Weight:</span> <strong>{totalWeight}%</strong>
          </div>
          {totalWeight !== 100 && (
            <p className="note-text">Note: Total weight must be 100% to proceed.</p>
          )}

          <div className="stock-weight-list">
            {selectedStocks.map((stock) => (
              <div key={stock} className="weight-row">
                <span>{stock}</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weights[stock]}
                  onChange={(e) => handleWeightChange(stock, e.target.value)}
                />
                <span>%</span>
              </div>
            ))}
          </div>

          <button
            className="action-button"
            onClick={handleSubmit}
            disabled={totalWeight !== 100}
          >
            Create & Analyse Portfolio →
          </button>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>

      {isAnalyzing && <AnalyzingPopup onClose={() => setIsAnalyzing(false)} />}
      {isAnalysisComplete && <AnalysisCompletePopup onClose={() => {
        onSubmit({ weights });
        setIsAnalysisComplete(false);
        onClose();
      }} />}
    </>
  );
};

export default SetWeightsPopup;
