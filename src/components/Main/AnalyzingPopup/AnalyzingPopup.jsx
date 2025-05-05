import React, { useState, useEffect } from "react";
import "./AnalyzingPopup.css";

const AnalyzingPopup = ({ onClose }) => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Analyzing...";

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
    <div className="overlay">
      <div className="popup analyzing-popup">
        <h1 className="typing-text main-text">{typedText}</h1>
        <p>Step 1 of 3: Analyzing Market Factors...</p>
        <p className="sub-text">
          Please wait while we analyze your portfolio using our causal engine
          and generate insights with our AI agent. This may take a few moments.
        </p>
        <button className="close-button" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default AnalyzingPopup;
