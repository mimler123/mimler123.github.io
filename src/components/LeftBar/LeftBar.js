import React, { useState } from "react";
import firebase, { provider } from "../../services/firebase";
import "./LeftBar.css";
import SearchImg from "./SearchImg.png";

export default function LeftBar() {
  const markers = firebase.firestore().collection("Markers");
  //var provider = new firebase.auth.GoogleAuthProvider();

  const [loggedIn, setLoggedIn] = useState(false);
  const [locations, setLocations] = useState([]);
  const [items, setItems] = useState([]);
  const [quests, setQuests] = useState([]);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  var getLocations = () => {
    if (!loggedIn) {
      return;
    }
    firebase
      .firestore()
      .collection("Markers")
      .where("category", "==", "locations")
      .get()
      .then((snapshot) => {
        setLocations(snapshot.docs.map((doc) => doc.data()));
        return;
      });
  };
  var getItems = () => {
    if (!loggedIn) {
      return;
    }
    firebase
      .firestore()
      .collection("Markers")
      .where("category", "==", "items")
      .get()
      .then((snapshot) => {
        setItems(snapshot.docs.map((doc) => doc.data()));
        return;
      });
  };
  var getQuests = () => {
    if (!loggedIn) {
      return;
    }
    firebase
      .firestore()
      .collection("Markers")
      .where("category", "==", "quests")
      .get()
      .then((snapshot) => {
        setQuests(snapshot.docs.map((doc) => doc.data()));
        return;
      });
  };

  var signIn = () => {
    if (loggedIn && firebase.auth().currentUser) {
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
      .signInWithPopup(provider)
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
        setLoggedIn(false);
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
      <div className="Filters" id="Filters">
        <div className="Filter" id="Locations">
          <p className="group">LOCATIONS</p>
          {getLocations()}
          {locations.map((loc) => (
            <li>{loc.name}</li>
          ))}
        </div>
        <div className="Filter" id="Items">
          <p className="group">ITEMS</p>
          {getItems()}
          {items.map((item) => (
            <li>{item.name}</li>
          ))}
        </div>
        <div className="Filter" id="Quests">
          <p className="group">QUESTS</p>
          {getQuests()}
          {quests.map((quest) => (
            <li>{quest.name}</li>
          ))}
        </div>
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
  );
}
