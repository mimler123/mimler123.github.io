import { useState } from "react";
import { useBetween } from "use-between";

const UseCreateGuild = () => {
  const [createguild, setCreateguild] = useState(false);

  return {
    createguild,
    setCreateguild,
  };
};

const useSharedCreateguild = () => useBetween(UseCreateGuild);

export default useSharedCreateguild;
