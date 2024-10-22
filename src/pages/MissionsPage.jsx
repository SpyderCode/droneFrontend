import { useMissions } from "../context/MissionsContext";
import MissionCard from "../components/MissionCard";
import { useNavigate } from "react-router-dom";

export default function MissionsPage() {
  const { missions, deleteMission } = useMissions();
  const navigate = useNavigate();

  if(missions.length === 0) {
    return (
      <div>
        <h1>No missions</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl text-white">Missions</h1>
        <button
          className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded"
          onClick={() => navigate("/add-missions")}
        >
          Add Mission
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {missions.map(mission => (
          <MissionCard key={mission._id} mission={mission} deleteMission={deleteMission} />
        ))}
      </div>
    </div>
  );
}
