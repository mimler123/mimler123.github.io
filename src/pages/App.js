import React, { useState } from "react";
import "./App.css";
import StartState from "../services/start";
import LeftBar from "../components/LeftBar/LeftBar";
import RightBar from "../components/RightBar/RightBar";
import GameMap from "../components/Map/Map";
import Start from "../components/Start/Start";
import Google from "../components/Google/Google";
import Firebase from "../services/firebase";

export default function App() {
  const { start, setStart } = StartState();
  const [loggedIn, setLoggedIn] = useState(false);

  Firebase.auth().onAuthStateChanged((user) => {
    if (user && !loggedIn) {
      setLoggedIn(true);
    } else if (!user && loggedIn) {
      setLoggedIn(false);
    }
  });

  var c = () => {
    if (!loggedIn) {
      return <Google />;
    } else {
      return <></>;
    }
  };

  var m = () => {
    return (
      <>
        {c()}
        <LeftBar />
        <GameMap />
        <RightBar />
      </>
    );
  };

  return <div id="main">{start ? <Start /> : m()}</div>;
}
