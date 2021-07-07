import React from "react";
import "./RightBar.css";
import JoinGuild from "../../services/joinguild";
import CreateGuild from "../../services/createguild";
import CurrentGuild from "../currentguild/currentguild";
import CurrentGuildd from "../../services/currentguild";
import Firebase from "../../services/firebase";

export default function RightBar() {
  const { setJoinguild } = JoinGuild();
  const { setCreateguild } = CreateGuild();
  const { currentguild, setCurrentguild } = CurrentGuildd();
  const open = () => {
    setJoinguild(true);
    setCreateguild(false);
  };
  const openCreate = () => {
    setCreateguild(true);
    setJoinguild(false);
  };
  const checkGuild = () => {
    if (currentguild.name !== "") {
      return <CurrentGuild />;
    } else {
      return <></>;
    }
  };
  const leaveGuild = () => {
    var u = currentguild.users;
    if (Firebase.auth().currentUser.email === currentguild.creator) {
      Firebase.firestore()
        .collection("Guilds")
        .doc(currentguild.id)
        .delete()
        .then(() => {})
        .catch((error) => {
          console.log("Could not delete guild: " + error);
        });
    } else {
      u.splice(u.indexOf(Firebase.auth().currentUser.email), 1);
      Firebase.firestore()
        .collection("Guilds")
        .doc(currentguild.id)
        .update({ users: u });
    }
    setCurrentguild({
      name: "",
      creation: 0,
      creator: "",
      id: "",
      users: [],
    });
  };
  const checkGuildBtns = () => {
    if (currentguild.name !== "") {
      return (
        <>
          <button className="LeaveGuild" onClick={leaveGuild}>
            LEAVE GUILD
          </button>
        </>
      );
    } else {
      return (
        <>
          <button className="joinBtn" onClick={open}>
            JOIN GUILD
          </button>
          <button className="createBtn" onClick={openCreate}>
            CREATE GUILD
          </button>
        </>
      );
    }
  };
  return (
    <>
      <div className="RightBar">
        <div className="TitleBox">
          <p className="Title">DEEPWOKEN</p>
          <p className="TitleDes">INTERACTIVE MAP</p>
          <p className="TitleVersion">V - 1.0 / 15.05.2021</p>
        </div>
        <hr className="wide" />
        <div className="leave">{checkGuildBtns()}</div>
        <hr className="wide" />
      </div>
      {checkGuild()}
    </>
  );
}
