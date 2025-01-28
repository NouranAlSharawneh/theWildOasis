import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings.js";
import toast from "react-hot-toast";

export const useUpdateSettings = () => {
  const queryClinet = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["settings"],
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClinet.invalidateQueries({ queryKey: ["settings"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, mutate };
};
