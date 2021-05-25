import { useState } from "react";
import { useBetween } from "use-between";

const useItem = () => {
  const [items, setItems] = useState([
    {
      name: "Please login to see.",
    },
  ]);

  return {
    items,
    setItems,
  };
};

const useSharedItem = () => useBetween(useItem);

export default useSharedItem;
