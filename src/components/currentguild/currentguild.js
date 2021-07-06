import React from "react";
import "./currentguild.css";
import CurrentGuild from "../../services/currentguild";

export default function currentguild() {
  const { currentguild, setCurrentguild } = CurrentGuild();

  var date = new Date(currentguild.creation);

  return (
    <div className="currentGuild">
      <h3>Current Guild: </h3>
      <p className="guildName">{currentguild.name}</p>
      <p>Leader: </p>
      {currentguild.creator}
      <p>Creation: </p>
      {date.toUTCString()}
      <p>Guild-ID:</p>
      {currentguild.id}
      <p>Users in Guild: {currentguild.users.length}</p>
    </div>
  );
}
