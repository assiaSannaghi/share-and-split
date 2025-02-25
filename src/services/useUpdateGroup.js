import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateGroup } from "./apiGroups";

export function useUpdateGroup() {
  const queryClient = useQueryClient();

  const { mutate: mutateUpdatingGroup, isPending: isUpdating } = useMutation({
    mutationFn: updateGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (err) => console.error(err.message),
  });

  return { mutateUpdatingGroup, isUpdating };
}
