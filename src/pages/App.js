import React, { useState } from "react";
import "./App.css";
import StartState from "../services/start";
import JoinGuildState from "../services/joinguild";
import CreateGuildState from "../services/createguild";
import LeftBar from "../components/LeftBar/LeftBar";
import RightBar from "../components/RightBar/RightBar";
import GameMap from "../components/Map/Map";
import Start from "../components/Start/Start";
import Google from "../components/Google/Google";
import JoinGuild from "../components/JoinGuild/JoinGuild";
import CreateGuild from "../components/CreateGuild/CreateGuild";
import Firebase from "../services/firebase";

export default function App() {
  const { start } = StartState();
  const { joinguild } = JoinGuildState();
  const { createguild } = CreateGuildState();
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

  var jg = () => {
    if (joinguild) {
      return <JoinGuild />;
    } else {
      return <></>;
    }
  };
  var cg = () => {
    if (createguild) {
      return <CreateGuild />;
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
        {jg()}
        {cg()}
        <RightBar />
      </>
    );
  };

  return <div id="main">{start ? <Start /> : m()}</div>;
}
