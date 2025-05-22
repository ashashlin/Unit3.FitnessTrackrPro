import { useNavigate, useParams } from "react-router-dom";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function ActivityDetails() {
  const { activityId } = useParams();
  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${activityId}`, "activity");

  const { token } = useAuth();
  const {
    mutate: deleteActivity,
    loading: isLoading,
    error: deleteError,
  } = useMutation("DELETE", `/activities/${activityId}`, ["activities"]);
  const navigate = useNavigate();

  if (loading || !activity) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <>
      <h1>{activity?.name}</h1>
      <p>by {activity?.creatorName}</p>
      <p>{activity?.description}</p>
      {token && (
        <button
          onClick={() => {
            deleteActivity();
            navigate("/activities");
          }}
        >
          {isLoading ? "Deleting" : deleteError ? deleteError : "Delete"}
        </button>
      )}
    </>
  );
}
