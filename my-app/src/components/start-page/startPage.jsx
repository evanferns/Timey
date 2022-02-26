import React from "react";
import "./startPage.css";
function StartPage() {
  return (
    <div className="start-page">
      <div className="start-page-header">
        <p>Timey</p>
      </div>
      <div className="start-page-container">
        <button className="start-page-button">New Session</button>
        <button className="start-page-button">Join Session</button>
      </div>
    </div>
  );
}

export default StartPage;
