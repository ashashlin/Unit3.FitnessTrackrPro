import { Link } from "react-router-dom";
import useQuery from "../api/useQuery";

export default function RoutineList() {
  const { data: routines, loading, error } = useQuery("/routines", "routines");

  console.log(routines);

  if (loading || !routines) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {routines.map((routine) => (
        <RoutineListItem key={routine.id} routine={routine} />
      ))}
    </ul>
  );
}

function RoutineListItem({ routine }) {
  return (
    <Link to={`/routines/${routine.id}`}>
      <li>{routine.name}</li>
    </Link>
  );
}
