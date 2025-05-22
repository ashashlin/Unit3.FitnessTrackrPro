import { useNavigate, useParams } from "react-router-dom";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function RoutineDetails() {
  const { routineId } = useParams();
  const {
    data: routine,
    loading,
    error,
  } = useQuery(`/routines/${routineId}`, "routine");

  const { token } = useAuth();
  const {
    mutate: deleteRoutine,
    loading: isLoading,
    error: deleteError,
  } = useMutation("DELETE", `/routines/${routineId}`, ["routines"]);
  const navigate = useNavigate();

  if (loading || !routine) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <>
      <h1>{routine?.name}</h1>
      <p>by {routine?.creatorName}</p>
      <p>{routine?.goal}</p>
      {token && (
        <button
          onClick={() => {
            deleteRoutine();
            navigate("/routines");
          }}
        >
          {isLoading
            ? "Deleting"
            : deleteError
            ? deleteError
            : "Delete routine"}
        </button>
      )}
    </>
  );
}
