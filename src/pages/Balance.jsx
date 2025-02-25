import { Link, useParams } from "react-router";

import { useGroups } from "../services/useGroups";
import BackButton from "../components/BackButton";
import GroupNav from "../components/GroupNav";
import ParticipantBalance from "../components/ParticipantBalance";
import Spinner from "../components/Spinner";

function Balance() {
  const { groupId } = useParams();
  const { isLoading, groups } = useGroups();
  if (isLoading) return <Spinner />;

  const [currentGroup] = groups.filter((group) => +group.id === +groupId);

  return (
    <main className="relative">
      <Link to="/">
        <BackButton />
      </Link>
      <h1>Share And Split</h1>
      <p className="underline text-xl text-center uppercase font-semibold">
        {currentGroup.groupTitle}
      </p>
      <GroupNav />
      {currentGroup.listParticipants.map((participant) => (
        <ParticipantBalance
          participant={participant.fullName}
          balance={participant.delta}
          key={participant.id}
        />
      ))}
    </main>
  );
}

export default Balance;
