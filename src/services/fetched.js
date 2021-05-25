import { useState } from "react";
import { useBetween } from "use-between";

const useFetched = () => {
  const [fetched, setFetched] = useState(false);

  return {
    fetched,
    setFetched,
  };
};

const useSharedFetched = () => useBetween(useFetched);

export default useSharedFetched;
