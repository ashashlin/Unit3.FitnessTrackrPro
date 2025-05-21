import { useParams } from "react-router-dom";
import useQuery from "../api/useQuery";

export default function ActivityDetails() {
  const { activityId } = useParams();
  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${activityId}`, "activity");

  if (loading || !activity) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <>
      <h1>{activity?.name}</h1>
      <p>by {activity?.creatorName}</p>
      <p>{activity?.description}</p>
    </>
  );
}
