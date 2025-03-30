import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const { mutate: signup, isLoading: isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: () =>
      toast.success(
        "Account successfully created. Please verify your account from the user's email address."
      ),
    onError: () => toast.error("An error occured while creating your account"),
  });
  return { signup, isLoading };
}

export default useSignup;
