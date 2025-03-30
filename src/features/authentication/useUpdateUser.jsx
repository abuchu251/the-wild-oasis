import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      UpdateCurrentUser({ password, fullName, avatar }),
    mutationKey: ["user"],
    onSuccess: (user) => {
      toast.success("Account updated successfully");
      queryClient.setQueryData(["user"], user.user);
    },
    onError: () => toast.error("An error occured while updating your account"),
  });
  return { updateUser, isLoading };
}

export default useUpdateUser;
