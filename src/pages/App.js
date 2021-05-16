import React from "react";
import "./App.css";
import LeftBar from "../components/LeftBar/LeftBar";
import RightBar from "../components/RightBar/RightBar";
import GameMap from "../components/Map/Map";

export default function App() {
  return (
    <div id="main">
      <LeftBar />
      <GameMap />
      <RightBar />
    </div>
  );
}
