import React from "react";
import "./CreateGuild.css";
import CreateGuildd from "../../services/createguild";
import CurrentGuild from "../../services/currentguild";
import Firebase from "../../services/firebase";

export default function CreateGuild() {
  const { createguild, setCreateguild } = CreateGuildd();
  const { currentguild, setCurrentguild } = CurrentGuild();

  const cancel = () => {
    setCreateguild(false);
  };

  const createGuild = () => {
    if (
      currentguild.name !== "" ||
      document.getElementById("nog").value === ""
    ) {
      return;
    }
    Firebase.firestore()
      .collection("Guilds")
      .add({
        name: document.getElementById("nog").value,
        creator: Firebase.auth().currentUser.email,
        creation: new Date().getTime(),
        users: [Firebase.auth().currentUser.email],
        id: 0,
      })
      .then((docRef) => {
        docRef.update({
          id: docRef.id,
        });
        setCurrentguild({
          name: document.getElementById("nog").value,
          creator: Firebase.auth().currentUser.email,
          creation: new Date().getTime(),
          users: [Firebase.auth().currentUser.email],
          id: docRef.id,
        });
        setCreateguild(false);
      })
      .catch((error) => {
        alert("Could not create new Guild: " + error);
      });
  };

  return (
    <div className="CreateGuild">
      <h3>Create Guild</h3>
      <input id="nog" placeholder="Name of Guild" />
      <button onClick={createGuild}>Create!</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}
