import { useState } from "react";
import { useBetween } from "use-between";

const useStart = () => {
  const [start, setStart] = useState(true);

  return {
    start,
    setStart,
  };
};

const useSharedStart = () => useBetween(useStart);

export default useSharedStart;
