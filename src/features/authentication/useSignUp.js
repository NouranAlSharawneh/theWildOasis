import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth.js";
import toast from "react-hot-toast";
export const useSignUp = () => {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({ fullName, email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success("Successfully signed up! Please verify your email address");
    },
  });

  return { signUp, isPending };
};
