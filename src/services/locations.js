import { useState } from "react";
import { useBetween } from "use-between";

const useLocation = () => {
  const [locations, setLocations] = useState([
    {
      name: "Please login to see.",
      //position: [0, 0],
      visible: true,
      id: 0
    },
  ]);

  return {
    locations,
    setLocations,
  };
};

const useSharedLocation = () => useBetween(useLocation);

export default useSharedLocation;
