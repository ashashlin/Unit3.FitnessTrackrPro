import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

/** Shows a list of activities. */
export default function ActivityList() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}

/** Shows a single activity. Logged-in users will also see a delete button. */
function ActivityListItem({ activity }) {
  return (
    <Link to={`/activities/${activity.id}`}>
      <li>
        <p>{activity.name}</p>
      </li>
    </Link>
  );
}
