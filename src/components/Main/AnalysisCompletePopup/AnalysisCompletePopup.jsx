
import React from "react";
import "./AnalysisCompletePopup.css";

const AnalysisCompletePopup = ({ onClose }) => {
  return (
    <div className="overlay">
      <div className="popup complete-popup">
        <h1>✅ Analysis Complete!</h1>
        <p>Your portfolio has been analyzed successfully.</p>
        <button className="action-button" onClick={onClose}>
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AnalysisCompletePopup;
