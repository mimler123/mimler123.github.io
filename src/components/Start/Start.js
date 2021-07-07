import "./Start.css";
import React from "react";
import StartLogo from "./startlogo.png";
import StartState from "../../services/start";

export default function Start() {
  const { setStart } = StartState();

  var click = () => {
    setStart(false);
    console.log("Starting...");
  };

  return (
    <div className="Start" onClick={click}>
      <h1>DEEPWOKEN</h1>
      <h3>INTERACTIVE MAP</h3>
      <div className="StartBox">
        <p>- Press any key to begin -</p>
        <img src={StartLogo} alt="START" />
      </div>
    </div>
  );
}
