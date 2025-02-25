import { useNavigate } from "react-router";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

import Initial from "./Initial";
import { useDeleteGroup } from "../services/useDeleteGroup";
import { useDeleteActivity } from "../services/useDeleteActivity";

function Group({ groupId, title, participants }) {
  const navigate = useNavigate();
  const handleNavigation = (id) => navigate(`/expenses/${id}`);

  const { deleteGroup, isDeleting } = useDeleteGroup();
  const { deleteActivity, isDeletingActivity } = useDeleteActivity();

  return (
    <div className="relative">
      <div
        className="flex items-center border-2 border-yellow-400 grow mb-5 rounded-md py-2 px-5 hover:shadow-lg cursor-pointer transition-shadow duration-300"
        onClick={() => handleNavigation(groupId)}
      >
        <Initial>{title}</Initial>
        <div>
          <p className="text-lg uppercase font-bold text-left">{title}</p>
          <p className="text-xs font-bold text-gray-400 text-left">
            With {participants.join(", ")}
          </p>
        </div>

        <MdKeyboardArrowRight className="text-4xl ml-auto" />
      </div>
      <MdOutlineDelete
        className="text-2xl top-[18px] right-14 z-10 cursor-pointer hover:fill-red-500 transition-colors absolute"
        onClick={() => {
          deleteActivity(groupId, {
            onSuccess: () => {
              deleteGroup(groupId);
            },
          });
        }}
        disabled={isDeleting || isDeletingActivity}
      />
    </div>
  );
}

export default Group;
