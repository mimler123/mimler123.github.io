import React from "react";
import "./JoinGuild.css";
import JoinGuildd from "../../services/joinguild";
import Firebase from "../../services/firebase";

export default function JoinGuild() {
  const { joinguild, setJoinguild } = JoinGuildd();

  const cancel = () => {
    setJoinguild(false);
  };

  const join = () => {
    var id = document.getElementById("gid").value;
    Firebase.firestore()
      .collection("Guilds")
      .where("id", "==", id)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          console.log(snapshot.docs[0].data());
        } else {
          console.log("Nothing found.");
        }
      });
  };

  return (
    <div className="JoinGuild">
      <h3>JOIN GUILD</h3>
      <input id="gid" placeholder="Guild ID" />
      <button onClick={join}>Join!</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}
