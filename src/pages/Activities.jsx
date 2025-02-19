import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import AddButton from "../components/AddButton";
import BackButton from "../components/BackButton";
import GroupNav from "../components/GroupNav";
import Activity from "../components/Activity";
import Spinner from "../components/Spinner";
import { getActivities } from "../services/apiActivities";
import { useGroups } from "../services/useGroups";

function Activities() {
  const { groupId } = useParams();

  const { isLoading: isLoadingGroups, groups } = useGroups();

  const { isPending: isLoadingActivies, data: activities } = useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });

  if (isLoadingGroups || isLoadingActivies) return <Spinner />;

  const [currentGroup] = groups.filter((group) => +group.id === +groupId);

  const currActivities = activities.filter(
    (activity) => +activity.groupId === +groupId
  );

  return (
    <main className="relative px-3 text-center">
      <Link to="/">
        <BackButton />
      </Link>
      <h1>Share And Split</h1>
      <p className="underline text-xl uppercase font-semibold">
        {currentGroup.groupTitle}
      </p>
      <GroupNav />
      <p className="text-right mb-6">
        Total:{" "}
        <span className="font-bold">
          {currActivities.length > 0
            ? currActivities
                .map((activity) => activity.totalPrice)
                .reduce((acc, cur) => acc + cur)
            : 0}
        </span>{" "}
        MAD
      </p>
      <div className="max-h-80 overflow-auto">
        {currActivities.length > 0 ? (
          currActivities.map((activity) => (
            <Activity
              key={activity.id}
              title={activity.activityTitle}
              participant={activity.activityPaidBy}
              price={activity.totalPrice}
            />
          ))
        ) : (
          <p className="text-lg font-semibold">
            Start by adding new activity to your group.
          </p>
        )}
      </div>

      <Link className="inline-block" to={`/newActivity/${groupId}`}>
        <AddButton />
      </Link>
    </main>
  );
}

export default Activities;
