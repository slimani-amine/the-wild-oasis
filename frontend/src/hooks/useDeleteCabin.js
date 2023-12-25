import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../services/apiCabins";
import toast from "react-hot-toast";
export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (error) => {
      toast.error("cabin could not to be deleted");
    },
  });
  return { isDeleting, deleteCabin };
}
