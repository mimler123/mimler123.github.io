import React, { useState } from "react";
import firebase from "../../services/firebase";
import "./LeftBar.css";
import SearchImg from "./SearchImg.png";

export default function LeftBar() {
  const [loggedIn, setLoggedIn] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  var signIn = () => {
    if (loggedIn) {
      return (
        <div className="l">
          <button onClick={logout}>LOGOUT</button>
          <p>DEBUG: Logged in as {firebase.auth().currentUser.displayName}</p>
        </div>
      );
    } else {
      return <button onClick={login}>LOGIN WITH GOOGLE</button>;
    }
  };
  var login = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        var user = res.user;
        //var token = res.accessToken;
        console.log("Logged in with email " + user.email);
        //setLoggedIn(true);
      })
      .catch((err) => {
        //var errorCode = err.code;
        var errorMsg = err.message;
        //var mail = err.email;
        console.log("Error during login: " + errorMsg);
      });
  };
  var logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Logged out.");
      })
      .catch((error) => {
        console.log("Error during logout: " + error);
      });
  };
  return (
    <div id="LeftBar">
      <div className="header">
        <h1>DEEPWOKEN</h1>
        <h3>INTERACTIVE MAP</h3>
      </div>
      <hr />

      <div className="Visibillity">
        <button>SHOW ALL</button>
        <button>HIDE ALL</button>
      </div>

      <hr />
      <div className="s">
        <div className="searchBox">
          <input placeholder="SEARCH..." />
          <img src={SearchImg} alt="EYE" />
        </div>
      </div>
      <div className="Filters">
        <div className="Filter" id="Locations">
          <p className="group">LOCATIONS</p>
          <ul>
            <li>Test-Item</li>
            <li>Test-Item</li>
          </ul>
        </div>
        <div className="Filter" id="Items">
          <p className="group">ITEMS</p>
          <ul>
            <li>Test-Item</li>
            <li>Test-Item</li>
          </ul>
        </div>
        <div className="Filter" id="Quests">
          <p className="group">QUESTS</p>
          <ul>
            <li>Test-Item</li>
            <li>Test-Item</li>
          </ul>
        </div>
        <div className="Filter" id="Members">
          <p className="group">MEMBERS</p>
          <ul>
            <li>Test-Item</li>
            <li>Test-Item</li>
          </ul>
        </div>

        {signIn()}

        <div className="footer">
          <p className="version">V - 1.0 / 16.05.21</p>
          <div className="creditsBox">
            <p className="creditsTitle">MADE BY</p>
            <p className="credits">SAMSUNNY - MIMLER123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
