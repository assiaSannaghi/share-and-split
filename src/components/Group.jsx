import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

import Initial from "./Initial";
import { deteleGroup } from "../services/apiGroups";

function Group({ groupId, title, participants }) {
  const navigate = useNavigate();
  const handleNavigation = (id) => navigate(`/expenses/${id}`);

  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deteleGroup,
    onSuccess: () => {
      toast.success("Group seccessfullly deleted");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <div className="flex items-center border-2 border-yellow-400 grow mb-5 rounded-md py-2 px-5 hover:shadow-lg cursor-pointer transition-shadow duration-300">
      <Initial>{title}</Initial>
      <div>
        <p className="text-lg uppercase font-bold text-left">{title}</p>
        <p className="text-xs font-bold text-gray-400">
          With {participants.join(", ")}
        </p>
      </div>
      <MdOutlineDelete
        className="text-2xl ml-auto"
        onClick={() => mutate(groupId)}
        disabled={isDeleting}
      />
      <MdKeyboardArrowRight
        className="text-4xl ml-1"
        onClick={() => handleNavigation(groupId)}
      />
    </div>
  );
}

export default Group;
