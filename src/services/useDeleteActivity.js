import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deteleActivity as deteleActivityAPI } from "../services/apiActivities";

export function useDeleteActivity() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingActivity, mutate: deleteActivity } = useMutation(
    {
      mutationFn: deteleActivityAPI,
      onSuccess: () => {
        // toast.success("Activity seccessfullly deleted");
        queryClient.invalidateQueries({ queryKey: ["activities"] });
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { deleteActivity, isDeletingActivity };
}
