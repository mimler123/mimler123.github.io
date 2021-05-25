import { useState } from "react";
import { useBetween } from "use-between";

const useQuest = () => {
  const [quests, setQuests] = useState([
    {
      name: "Please login to see.",
    },
  ]);

  return {
    quests,
    setQuests,
  };
};

const useSharedQuest = () => useBetween(useQuest);

export default useSharedQuest;
