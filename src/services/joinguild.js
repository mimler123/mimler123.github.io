import { useState } from "react";
import { useBetween } from "use-between";

const UseJoinGuild = () => {
  const [joinguild, setJoinguild] = useState(false);

  return {
    joinguild,
    setJoinguild,
  };
};

const useSharedJoinguild = () => useBetween(UseJoinGuild);

export default useSharedJoinguild;
