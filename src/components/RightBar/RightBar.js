import React from "react";
import "./RightBar.css";
import JoinGuild from "../../services/joinguild";
import CreateGuild from "../../services/createguild";

export default function RightBar() {
  const { joinguild, setJoinguild } = JoinGuild();
  const { createguild, setCreateguild } = CreateGuild();
  const open = () => {
    setJoinguild(true);
    setCreateguild(false);
  };
  const openCreate = () => {
    setCreateguild(true);
    setJoinguild(false);
  };
  return (
    <div className="RightBar">
      <div className="TitleBox">
        <p className="Title">DEEPWOKEN</p>
        <p className="TitleDes">INTERACTIVE MAP</p>
        <p className="TitleVersion">V - 1.0 / 15.05.2021</p>
      </div>
      <hr className="wide" />
      <div className="leave">
        <button className="joinBtn" onClick={open}>
          JOIN GUILD
        </button>
        <button className="createBtn" onClick={openCreate}>
          CREATE GUILD
        </button>
      </div>
      <hr className="wide" />
    </div>
  );
}
