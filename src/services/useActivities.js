import { useQuery } from "@tanstack/react-query";
import { getActivities } from "./apiActivities";

export function useActivities() {
  const {
    isPending: isLoadingActivities,
    data: activities,
    error,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });

  return { isLoadingActivities, activities, error };
}
