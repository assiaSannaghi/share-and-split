import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deteleGroup as deteleGroupAPI } from "../services/apiGroups";

export function useDeleteGroup() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteGroup } = useMutation({
    mutationFn: deteleGroupAPI,
    onSuccess: () => {
      toast.success("Group seccessfullly deleted");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteGroup, isDeleting };
}
