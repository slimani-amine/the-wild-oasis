import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";

export function useCabins() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });
  return { cabins, isLoading, error };
}
