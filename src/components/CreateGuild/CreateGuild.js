import React from "react";
import "./CreateGuild.css";
import CreateGuildd from "../../services/createguild";

export default function CreateGuild() {
  const { createguild, setCreateguild } = CreateGuildd();

  const cancel = () => {
    setCreateguild(false);
  };

  return (
    <div className="CreateGuild">
      <h3>Create Guild</h3>
      <input placeholder="Name of Guild" />
      <button>Create!</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}
