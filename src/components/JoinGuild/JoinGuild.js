import React from "react";
import "./JoinGuild.css";
import JoinGuildd from "../../services/joinguild";
import CurrentGuild from "../../services/currentguild";
import Firebase from "../../services/firebase";

export default function JoinGuild() {
  const { setJoinguild } = JoinGuildd();
  const { setCurrentguild } = CurrentGuild();

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
          var g = snapshot.docs[0].data();
          g.users.push(Firebase.auth().currentUser.email);
          Firebase.firestore()
            .collection("Guilds")
            .doc(id)
            .update({ users: g.users });
          setCurrentguild({
            name: g.name,
            creator: g.creator,
            creation: g.creation,
            id: g.id,
            users: g.users,
          });
          setJoinguild(false);
        } else {
          alert("No guild found.");
        }
      });
  };

  return (
    <div className="JoinGuild">
      <h3>JOIN GUILD</h3>
      <span className="vert">
        <input id="gid" placeholder="Guild ID" />
      </span>
      <button onClick={join}>Join!</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}
