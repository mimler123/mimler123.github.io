import { useState } from "react";
import { useBetween } from "use-between";

const useRerender = () => {
  const [rerender, setRerender] = useState(false);

  return {
    rerender,
    setRerender,
  };
};

const useSharedRerender = () => useBetween(useRerender);

export default useSharedRerender;
