import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import BackButton from "../components/BackButton";
import GroupNav from "../components/GroupNav";
import ParticipantBalance from "../components/ParticipantBalance";
import Spinner from "../components/Spinner";
import { getGroups } from "../services/apiGroups";

function Balance() {
  const { groupId } = useParams();
  const { isPending: isLoading, data: groups } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });
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
