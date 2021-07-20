import { useState } from "react";
import { useBetween } from "use-between";

const useSelCoords = () => {
  const [selCoords, setSelCoords] = useState([false, 0, 0]);

  return {
    selCoords,
    setSelCoords,
  };
};

const useSharedSelCoords = () => useBetween(useSelCoords);

export default useSharedSelCoords;
