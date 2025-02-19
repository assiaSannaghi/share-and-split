import { useQuery } from "@tanstack/react-query";
import { getGroups } from "./apiGroups";

export function useGroups() {
  const {
    isPending: isLoading,
    data: groups = [],
    error,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  return { isLoading, groups, error };
}
