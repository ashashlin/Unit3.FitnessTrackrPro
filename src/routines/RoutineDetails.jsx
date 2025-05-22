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

      <h3>Sets</h3>
      {routine.sets.length === 0 ? (
        <p>This routine doesn't have any sets. Add one?</p>
      ) : (
        <ul className="routine-sets">
          {routine?.sets?.map((set) => (
            <SetListItem key={set.id} set={set} />
          ))}
        </ul>
      )}
    </>
  );
}

function SetListItem({ set }) {
  const { token } = useAuth();
  const {
    mutate: deleteSet,
    loading: isLoading,
    error: deleteError,
  } = useMutation("DELETE", `/sets/${set.id}`, ["routine"]);

  return (
    <li>
      <p>
        {set.name} x {set.count}
      </p>
      {token && (
        <button
          onClick={() => {
            deleteSet();
          }}
        >
          {isLoading ? "Deleting" : deleteError ? deleteError : "Delete set"}
        </button>
      )}
    </li>
  );
}
