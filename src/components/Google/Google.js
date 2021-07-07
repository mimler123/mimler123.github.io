import React from "react";
import "./Google.css";
import ctg from "./ctg.png";
import firebase, { provider } from "../../services/firebase";

export default function Google() {
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

  return (
    <div className="GoogleScreen">
      <h1>DEEPWOKEN</h1>
      <h3>INTERACTIVE MAP</h3>
      <button onClick={login}>
        <img src={ctg} alt="LOGIN" />
      </button>
    </div>
  );
}
