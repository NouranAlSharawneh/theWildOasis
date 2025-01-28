import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export const useCreateCabin = () => {
  const queryClint = useQueryClient();
  const { mutate: createCabin, isPending } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClint.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, createCabin };
};
