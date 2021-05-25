import React, { useState } from "react";
import firebase, { provider } from "../../services/firebase";
import "./LeftBar.css";
import SearchImg from "./SearchImg.png";
import Locations from "../../services/locations";
import Quests from "../../services/quests";
import Items from "../../services/items";
import Fetched from "../../services/fetched";

export default function LeftBar() {
  const [loggedIn, setLoggedIn] = useState(false);

  const { locations, setLocations } = Locations();
  const { quests, setQuests } = Quests();
  const { items, setItems } = Items();
  const { fetched, setFetched } = Fetched();

  const [fetchedLocations, setFetchedLocations] = useState(false);
  const [fetchedItems, setFetchedItems] = useState(false);
  const [fetchedQuests, setFetchedQuests] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    if (user && loggedIn === false) {
      setLoggedIn(true);
      console.log("Logged in succesful!");
    } else if (!user && loggedIn === true) {
      setLoggedIn(false);
      setFetchedItems(false);
      setFetchedLocations(false);
      setFetchedQuests(false);
      setLocations([
        {
          name: "Please login to see.",
        },
      ]);
      setItems([
        {
          name: "Please login to see.",
        },
      ]);
      setQuests([
        {
          name: "Please login to see.",
        },
      ]);
    }
  });

  var getLocations = () => {
    if (!loggedIn || fetchedLocations) {
      return;
    }
    firebase
      .firestore()
      .collection("Markers")
      .where("category", "==", "locations")
      .get()
      .then((snapshot) => {
        setLocations(snapshot.docs.map((doc) => doc.data()));
        setFetchedLocations(true);
        setFetched(true);
        return;
      });
  };
  var getItems = () => {
    if (!loggedIn || fetchedItems) {
      return;
    }
    firebase
      .firestore()
      .collection("Markers")
      .where("category", "==", "items")
      .get()
      .then((snapshot) => {
        setItems(snapshot.docs.map((doc) => doc.data()));
        setFetchedItems(true);
        return;
      });
  };
  var getQuests = () => {
    if (!loggedIn || fetchedQuests) {
      return;
    }
    firebase
      .firestore()
      .collection("Markers")
      .where("category", "==", "quests")
      .get()
      .then((snapshot) => {
        setQuests(snapshot.docs.map((doc) => doc.data()));
        setFetchedQuests(true);
        return;
      });
  };

  if (fetchedLocations && fetchedItems && fetchedQuests && !fetched) {
    //setFetched(true);
  } else if (!fetchedLocations && !fetchedItems && !fetchedQuests && fetched) {
    setFetched(false);
  }

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
            <li key={loc.name}>{loc.name}</li>
          ))}
        </div>
        <div className="Filter" id="Items">
          <p className="group">ITEMS</p>
          {getItems()}
          {items.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </div>
        <div className="Filter" id="Quests">
          <p className="group">QUESTS</p>
          {getQuests()}
          {quests.map((quest) => (
            <li key={quest.name}>{quest.name}</li>
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
