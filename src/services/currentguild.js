import { useState } from "react";
import { useBetween } from "use-between";

const UseCurrentGuild = () => {
  const [currentguild, setCurrentguild] = useState({
    name: "",
    creator: "",
    creation: 0,
    id: "",
    users: [],
  });

  return {
    currentguild,
    setCurrentguild,
  };
};

const useSharedCurrentGuild = () => useBetween(UseCurrentGuild);

export default useSharedCurrentGuild;
