import Group from "./Group";

import Spinner from "./Spinner";
import { useGroups } from "../services/useGroups";

function Groups() {
  const { isLoading, groups } = useGroups();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {groups.map((group) => (
        <Group
          groupId={group.id}
          title={group.groupTitle}
          participants={group.listParticipants.map(
            (participant) => participant.fullName
          )}
          key={group.id}
        />
      ))}
    </>
  );
}

export default Groups;
