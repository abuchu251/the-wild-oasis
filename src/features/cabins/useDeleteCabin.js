import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinInApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinInApi,
    onSuccess: () => {
      toast.success("Cabin Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
