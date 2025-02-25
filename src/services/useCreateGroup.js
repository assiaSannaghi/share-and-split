import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createGroup } from "./apiGroups";

export function useCreateGroup() {
  const queryClient = useQueryClient();

  const { mutate: mutateCreateGroup, isPending: isCreating } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("New group successfully created");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutateCreateGroup, isCreating };
}
