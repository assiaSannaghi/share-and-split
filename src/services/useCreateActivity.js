import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createActivity } from "./apiActivities";

export function useCreateActivity() {
  const queryClient = useQueryClient();

  const { mutate: mutateCreatingActivity, isPending: isCreating } = useMutation(
    {
      mutationFn: createActivity,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["activities"] });
        toast.success("New activity successfully created");
        // reset();
        // navigate(`/expenses/${groupId}`);
      },
      onError: (err) => toast.error(err.message),
    }
  );

  return { mutateCreatingActivity, isCreating };
}
