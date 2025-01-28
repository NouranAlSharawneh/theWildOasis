import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings.js";

export const useSettings = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isPending, data, error };
};
